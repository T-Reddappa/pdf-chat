from fastapi import APIRouter, UploadFile, File
from uuid import uuid4
from datetime import datetime
from app.services.pdf_extractor import extract_text_from_pdf
from app.services.s3_service import upload_file_to_s3
from app.db.crud import save_document_metadata
from app.services.vector_store import add_to_vector_store


router = APIRouter()

@router.post('/')
async def uploa_pdf(file: UploadFile = File(...)):
    content = await file.read()
    text = extract_text_from_pdf(content)
    filename = f"{uuid4()}.pdf"
    s3_url = upload_file_to_s3(content, filename)
    doc_id = save_document_metadata(filename, datetime.utcnow(),s3_url,text)
    add_to_vector_store(text, doc_id)
    return {"doc_id":doc_id, "filename":file.filename}

