import os
import shutil
import uuid
from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI, Request, File, UploadFile, BackgroundTasks
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from starlette.middleware.cors import CORSMiddleware

import ocr
import uvicorn

app = FastAPI()
templates = Jinja2Templates(directory="templates")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


# # Serve the React app
# app.mount("/", StaticFiles(directory="E:/OCR/capstone_project_sinhalaOCR/fontEnd", html=True), name="static")


# @app.get("/api/data")
# async def get_data():
#     return {"message": "API endpoint works"}


# @app.get("/")
# async def home(request: Request):
#     return templates.TemplateResponse("index.html", {"request": request})


@app.post("/api/v1/extract_text")
async def extract_text(image: UploadFile = File(...)):
    temp_file = _save_file_to_disk(image, path="temp", save_as="temp")
    text = await ocr.read_image(temp_file)
    return {"filename": image.filename, "text": text}


@app.post("/api/v1/bulk_extract_text")
async def bulk_extract_text(request: Request, bg_task: BackgroundTasks):
    images = await request.form()
    folder_name = str(uuid.uuid4())
    os.mkdir(folder_name)

    for image in images.values():
        temp_file = _save_file_to_disk(
            image, path=folder_name, save_as=image.filename)

    bg_task.add_task(ocr.read_images_from_dir, folder_name, write_to_file=True)
    return {"task_id": folder_name, "num_files": len(images)}


@app.get("/api/v1/bulk_output/{task_id}")
async def bulk_output(task_id):
    text_map = {}
    for file_ in os.listdir(task_id):
        if file_.endswith("txt"):
            text_map[file_] = open(os.path.join(task_id, file_)).read()
    return {"task_id": task_id, "output": text_map}


def _save_file_to_disk(uploaded_file, path=".", save_as="default"):
    extension = os.path.splitext(uploaded_file.filename)[-1]
    temp_file = os.path.join(path, save_as + extension)
    with open(temp_file, "wb") as buffer:
        shutil.copyfileobj(uploaded_file.file, buffer)
    return temp_file
