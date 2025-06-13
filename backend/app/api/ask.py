from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from langchain.chains.question_answering import load_qa_chain
from langchain_openai import ChatOpenAI
from app.services.vector_store import get_relevant_docs

router = APIRouter()

class QuestionRequest(BaseModel):
    question: str

@router.post("/")
async def ask_question(payload: QuestionRequest):
    try:
        docs = get_relevant_docs(payload.question)
        print(f'===============:{docs}')

        if not docs:
            raise HTTPException(status_code=404, detail="No relevant documents found.")

        # Load LLM
        llm = ChatOpenAI(model="gpt-4-turbo", temperature=0)

        # Load QA Chain
        chain = load_qa_chain(llm, chain_type="stuff")

        # Run chain
        answer = chain.run(input_documents=docs, question=payload.question)

        return {"question": payload.question, "answer": answer}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
