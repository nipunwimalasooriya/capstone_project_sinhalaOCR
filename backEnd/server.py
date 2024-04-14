from fastapi import FastAPI, Request, File, UploadFile, BackgroundTasks
from fastapi.templating import Jinja2Templates
import os
import uuid

import ocr

app = FastAPI()
templates = Jinja2Templates(directory="templates")

@app.get("/")
def home():
    return {"message": "Server started successfully!"}

@app.post("/api/v1/extract_text")
async def extract_text(image: UploadFile = File(...)):
    text = await ocr.read_image(await image.read())
    filename = str(image.filename)  # Convert filename to string
    return {"filename": filename, "text": text}

@app.post("/api/v1/bulk_extract_text")
async def bulk_extract_text(request: Request, bg_task: BackgroundTasks):
    images = await request.form()
    folder_name = str(uuid.uuid4())
    os.mkdir(folder_name)

    for image in images.values():
        temp_file = await image.read()
        text = await ocr.read_image(temp_file)
        # You can process 'text' here as required, such as saving it to a database
        # or storing it in a dictionary for later retrieval

    return {"task_id": folder_name, "num_files": len(images)}

@app.get("/api/v1/bulk_output/{task_id}")
async def bulk_output(task_id):
    # This endpoint can be used to retrieve processed text if you've stored it
    # in a database or dictionary in the bulk_extract_text function
    return {"task_id": task_id, "output": "Not implemented"}  # Modify as per your implementation
