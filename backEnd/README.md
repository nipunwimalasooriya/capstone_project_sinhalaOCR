# Sinhala OCR
Made using FastAPI and Tesseract and React for our Capstone Project IS 4103

## Setup
```
brew install tesseract
pip install -r requirements.txt
```

## If requirements text not installed successfully 

```
pip install aiofiles==0.6.0
pip install click==7.1.2
pip install fastapi==0.61.1
pip install h11==0.11.0
pip install Jinja2==2.11.2
pip install MarkupSafe==1.1.1
pip install pydantic==1.7
pip install pytesseract==0.3.6
pip install python-multipart==0.0.5
pip install six==1.15.0
pip install starlette==0.13.6
pip install typing-extensions==3.7.4.3
pip install uvicorn==0.12.2
pip install opencv-python
pip install pytest pytest-asyncio
```

## Starting a virtual environment and backend server
```
.\venv\Scripts\activate
uvicorn server:app --reload
```

## Change directory
```
cd capstone_project_sinhalaOCR\backEnd
cd capstone_project_sinhalaOCR\frontend
```

