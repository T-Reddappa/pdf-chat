from fastapi import APIRouter, UploadFile, File, Header, HTTPException
from uuid import uuid4
from ..services.vector_store import add_to_vector_store
import fitz 

router = APIRouter()

@router.post("/")
async def upload_pdf(file: UploadFile = File(...), x_session_id: str = Header(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDFs are supported.")
    
    # Read and extract text
    contents = await file.read()
    doc = fitz.open(stream=contents, filetype="pdf")
    text = "\n".join(page.get_text() for page in doc)
    doc.close()

    doc_id = str(uuid4())
    add_to_vector_store(text, doc_id, x_session_id)

    return {"doc_id": doc_id, "filename": file.filename}
