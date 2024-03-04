from fastapi import FastAPI, Request, UploadFile, BackgroundTasks, File
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
app.mount("/", StaticFiles(directory="templates/fontEnd/build", html=True), name="static")

@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# @app.get("/")
# async def read_root():
#     return {"message": "Welcome to the FastAPI application!"}

@app.get("/api/data")
async def get_data():
    return {"message": "API endpoint works"}

@app.post("/api/v1/extract_text")
async def extract_text(request: Request, bg_task: BackgroundTasks, file: UploadFile = File(...)):
    try:
        temp_file = _save_file_to_disk(file, path="temp", save_as="temp")
        text = await ocr.read_image(temp_file)
        return {"filename": file.filename, "text": text}
    except Exception as e:
        return {"error": str(e)}

def _save_file_to_disk(uploaded_file, path=".", save_as="default"):
    extension = os.path.splitext(uploaded_file.filename)[-1]
    temp_file = os.path.join(path, save_as + extension)
    with open(temp_file, "wb") as buffer:
        shutil.copyfileobj(uploaded_file.file, buffer)
    return temp_file
