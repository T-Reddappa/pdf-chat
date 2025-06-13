# PDF Chat Application

A modern web application that allows users to chat with their PDF documents using AI. Built with React, FastAPI,LangChain, OpenAI, RAG.

## Features

- Upload and process PDF documents
- Chat interface for interacting with PDF content
- AI-powered responses using LangChain and OpenAI
- Modern UI with Tailwind CSS
- Real-time chat experience

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- Framer Motion

### Backend

- FastAPI
- Python
- LangChain
- OpenAI
- Pinecone (Vector Database)
- PostgreSQL
- SQLAlchemy

## Prerequisites

- Node.js (v18 or higher)
- Python (v3.8 or higher)
- PostgreSQL
- OpenAI API key
- Pinecone API key

## Local Setup

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Create a `.env` file in the backend directory with the variables provided in the .env.example file like these:

   ```
   OPENAI_API_KEY=your_openai_api_key
   PINECONE_API_KEY=your_pinecone_api_key
   DATABASE_URL=postgresql://username:password@localhost:5432/dbname
   ```

4. Start the backend server:
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory:

   ```
   VITE_API_URL=http://localhost:8000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Upload a PDF document using the upload interface
3. Once the document is processed, you can start chatting with it
4. Type your questions in the chat interface and get AI-powered responses based on the PDF content

## Development

- Frontend runs on `http://localhost:5173`
- Backend API runs on `http://localhost:8000`
- API documentation is available at `http://localhost:8000/docs`

## License

This project is licensed under the MIT License - see the LICENSE file for details.
