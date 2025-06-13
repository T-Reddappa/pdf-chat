from .session import SessionLocal
from .models import Document

def save_document_metadata(filename, upload_date, s3_url, content):
    db = SessionLocal()
    doc = Document(filename=filename, upload_date=upload_date, s3_url=s3_url, content=content)
    db.add(doc)
    db.commit()
    db.refresh(doc)
    db.close()
    return doc.id

def get_document_text(doc_id):
    db = SessionLocal()
    doc = db.query(Document).filter_by(id=doc_id).first()
    db.close()
    return doc.content