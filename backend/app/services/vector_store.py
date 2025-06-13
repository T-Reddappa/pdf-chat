import os
from pinecone import Pinecone, ServerlessSpec
# from langchain_community.vectorstores import Pinecone as LangchainPinecone
from langchain_pinecone import Pinecone as LangchainPinecone
from langchain_openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter

# Environment variables
index_name = os.getenv("PINECONE_INDEX_NAME")
pinecone_api_key = os.getenv("PINECONE_API_KEY")
pinecone_cloud = os.getenv("PINECONE_CLOUD", "aws")
pinecone_region = os.getenv("PINECONE_REGION", "us-west-2")

# Initialize Pinecone client (no init() call needed anymore)
pc = Pinecone(api_key=pinecone_api_key)

# Create index if it doesn't exist
if index_name not in pc.list_indexes().names():
    pc.create_index(
        name=index_name,
        dimension=1536,  # for text-embedding-ada-002
        metric='cosine',
        spec=ServerlessSpec(
            cloud=pinecone_cloud,
            region=pinecone_region
        )
    )

# Get the vector store
def get_vector_store():
    embedding = OpenAIEmbeddings()
    return LangchainPinecone(index_name=index_name, embedding=embedding, namespace="", pinecone_api_key=os.getenv("PINECONE_API_KEY"))



# Add text to vector store
def add_to_vector_store(text, doc_id):
    splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    docs = splitter.create_documents([text], metadatas=[{"doc_id": doc_id}])
    
    vectorstore = get_vector_store()
    vectorstore.add_documents(docs)

def get_relevant_docs(query: str, k: int = 3):
    vectorstore = get_vector_store()
    return vectorstore.similarity_search(query, k=k)
