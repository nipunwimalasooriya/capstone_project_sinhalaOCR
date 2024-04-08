import os
import shutil
import uuid
import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch
from server import app, _save_file_to_disk

client = TestClient(app)

def test_home():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Server started successfully!"}

@patch("ocr.read_image")
def test_extract_text(mock_read_image, mock_save_file_to_disk):
    mock_read_image.return_value = "Mocked text"
    response = client.post("/api/v1/extract_text", files={"image": ("test_image.jpg", open("test_image.jpg", "rb"))})
    assert response.status_code == 200
    assert response.json()["text"] == "Mocked text"
    mock_read_image.assert_called_once()