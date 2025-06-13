# from langchain.chains.question_answering import load_qa_chain
# from langchain_openai import ChatOpenAI
# from langchain.text_splitter import CharacterTextSplitter

# # llm = OpenAI()
# llm = ChatOpenAI(model='gpt-4-turbo', temperature=1)


# def get_answer(text, question):
#     splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
#     docs = splitter.create_documents([text])
#     chain = load_qa_chain(llm, chain_type="map_reduce")
#     return chain.run(input_documents=docs, question=question)

from langchain.chains import RetrievalQA
from langchain_openai import OpenAI
from app.services.vector_store import get_vector_store

llm = OpenAI()

def get_answer(question: str):
    vectorstore = get_vector_store()
    retriever = vectorstore.as_retriever(search_kwargs={"k": 4})
    qa_chain = RetrievalQA.from_chain_type(llm=llm, retriever=retriever, chain_type="stuff")
    return qa_chain.run(question)
