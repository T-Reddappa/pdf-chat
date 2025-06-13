from fastapi import APIRouter,Body
from app.db.crud import get_document_text
from app.services.langchain_qa import get_answer

router = APIRouter()

@router.post("/")
async def ask_question(question: str = Body(...)):
    answer = get_answer(question)
    return {"answer": answer}


# @router.post('/')
# async def ask_question(doc_id: str = Body(...), question: str = Body(...)):
#     text = get_document_text(doc_id)
#     answer = get_answer(text,question)
#     return {"answer":answer}