from dotenv import load_dotenv
load_dotenv()



from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import upload,ask


app = FastAPI()

from app.db.models import Base
from app.db.session import engine

def create_tables():
    Base.metadata.create_all(bind=engine)

create_tables()

@app.get("/")
def read_root():
    return {"message": "PDF Chat Backend is Running!"}

@app.get('/hello')
async def root():
    return {"message":"Hello Word@@@@"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router, prefix='/upload', tags=['upload'])
app.include_router(ask.router, prefix='/ask', tags=["QA"])