from sqlalchemy import Column, String, DateTime, Text
from sqlalchemy.ext.declarative import declarative_base
import uuid

Base = declarative_base()

class Document(Base):
    __tablename__ = "documents"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    filename = Column(String)
    upload_date = Column(DateTime)
    s3_url = Column(String)
    content = Column(Text)
