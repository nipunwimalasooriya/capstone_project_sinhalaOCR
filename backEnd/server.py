from fastapi import FastAPI, Request, File, UploadFile, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import os
import shutil
import uuid
import ocr

app = FastAPI()
templates = Jinja2Templates(directory="templates")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve the React app
app.mount("/", StaticFiles(directory="templates/fontEnd", html=True), name="static")

@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/api/data")
async def get_data():
    return {"message": "API endpoint works"}

# Import necessary modules

@app.post("/api/v1/extract_text")
async def extract_text(request: Request, bg_task: BackgroundTasks):
    images = await request.form()

    if "image" in images:
        # Single file case
        image = images["image"]
        temp_file = _save_file_to_disk(image, path="temp", save_as="temp")
        text = await ocr.read_image(temp_file)
        return {"filename": image.filename, "text": text}
    elif images and all(image.filename for image in images.values()):
        # Multiple files case with valid filenames
        folder_name = str(uuid.uuid4())
        os.mkdir(folder_name)

        for image in images.values():
            temp_file = _save_file_to_disk(
                image, path=folder_name, save_as=image.filename
            )

        bg_task.add_task(ocr.read_images_from_dir, folder_name, write_to_file=True)
        return {"task_id": folder_name, "num_files": len(images)}
    else:
        return {"error": "No valid files provided in the request"}

def _save_file_to_disk(uploaded_file, path=".", save_as="default"):
    extension = os.path.splitext(uploaded_file.filename)[-1]
    temp_file = os.path.join(path, save_as + extension)
    with open(temp_file, "wb") as buffer:
        shutil.copyfileobj(uploaded_file.file, buffer)
    return temp_file
