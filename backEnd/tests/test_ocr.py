import os
import pytest
from unittest.mock import patch, MagicMock
from ocr import read_image

@pytest.mark.asyncio
async def test_read_image():
    img_path = "test_image.jpg"  
    text = await read_image(img_path)
    assert isinstance(text, str)