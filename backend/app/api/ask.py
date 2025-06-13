from fastapi import APIRouter, Header, HTTPException
from pydantic import BaseModel
from ..services.vector_store import get_vector_store
from langchain.chains.question_answering import load_qa_chain
from langchain_openai import ChatOpenAI

router = APIRouter()

class AskRequest(BaseModel):
    question: str
    doc_id: str

@router.post("/")
async def ask_question(req: AskRequest, x_session_id: str = Header(...)):
    vectorstore = get_vector_store()

    retriever = vectorstore.as_retriever(
        search_kwargs={"filter": {"doc_id": req.doc_id, "session_id": x_session_id}}
    )

    docs = retriever.get_relevant_documents(req.question)
    if not docs:
        raise HTTPException(status_code=404, detail="No documents found for this session.")

    chain = load_qa_chain(ChatOpenAI(), chain_type="stuff")
    answer = chain.run(input_documents=docs, question=req.question)

    return {"answer": answer}
