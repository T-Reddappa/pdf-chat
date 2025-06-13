from langchain.chains import RetrievalQA
from langchain_openai import OpenAI
from app.services.vector_store import get_vector_store

llm = OpenAI()

def get_answer(question: str):
    vectorstore = get_vector_store()
    retriever = vectorstore.as_retriever(search_kwargs={"k": 4})
    qa_chain = RetrievalQA.from_chain_type(llm=llm, retriever=retriever, chain_type="stuff")
    return qa_chain.run(question)
