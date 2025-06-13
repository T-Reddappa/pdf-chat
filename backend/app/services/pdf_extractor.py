import fitz
from io import BytesIO

def extract_text_from_pdf(pdf_bytes):
    doc = fitz.open(stream=BytesIO(pdf_bytes), filetype="pdf")
    return "\n".join(page.get_text() for page in doc)
