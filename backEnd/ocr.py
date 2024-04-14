import cv2
import os
import pytesseract

# Assuming Tesseract is installed and in the system PATH on Ubuntu
pytesseract.pytesseract.tesseract_cmd = 'tesseract'  # No need for full path

async def read_image(img_path, lang='sin'):
    try:
        # Read image using OpenCV
        img = cv2.imread(img_path)

        # Convert image to grayscale
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        # Apply thresholding to the image
        thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]

        # Apply morphological operations to remove noise
        kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
        opening = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel, iterations=1)

        # Apply OCR using Pytesseract to detect Sinhala Unicode language characters
        text = pytesseract.image_to_string(opening, lang=lang)
        return text
    except Exception as e:
        return f"[ERROR] Unable to process file: {img_path}, Error: {e}"

async def read_images_from_dir(dir_path, lang='sin'):
    """
    Performs OCR on all images present in a directory

    :dir_path: str, path to the directory of images
    :lang: str, language to be used while conversion (optional, default is english)

    Returns
    :converted_text: dict, mapping of filename to converted text for each image
    """

    converted_text = {}
    for file_ in os.listdir(dir_path):
        if file_.endswith(('png', 'jpeg', 'jpg')):
            text = await read_image(os.path.join(dir_path, file_), lang=lang)
            converted_text[os.path.join(dir_path, file_)] = text
    return converted_text
