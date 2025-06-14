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

- Docker and Docker Compose
- OpenAI API key
- Pinecone API key
- AWS Key, S3 Bucket

## 🚀 Quick Start with Docker

Follow these steps to run the entire application using Docker Compose.

### 🔹 Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/pdf-chat.git
cd pdf-chat
```

### 🔹 Step 2: Create .env Files

Create a `.env` file inside the backend directory:

```env
# backend/.env
OPENAI_API_KEY=your_openai_api_key
PINECONE_API_KEY=your_pinecone_api_key
DATABASE_URL=postgresql://username:password@your_postgres_host:5432/your_db
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=your_aws_region
S3_BUCKET_NAME=your_s3_bucket_name
```

If needed, also create a `.env` file inside the frontend directory:

```env
# frontend/.env
VITE_API_URL=http://localhost:8000
```

> **Note:** Vite requires all environment variables to be prefixed with `VITE_`.

### 🔹 Step 3: Run Docker Compose

```bash
docker-compose up -d --build
```

This command will:

- Build both frontend and backend images
- Start both containers
- Expose:
  - Frontend at: http://localhost:3000
  - Backend API at: http://localhost:8000
  - API Docs at: http://localhost:8000/docs

## 🐳 Docker Images (Optional Pull from Docker Hub)

You can also use pre-built Docker images instead of building locally:

```bash
# Pull images
docker pull reddappa3001/pdf-chat-frontend:latest
docker pull reddappa3001/pdf-chat-backend:latest

# Run frontend
docker run -d -p 3000:80 reddappa3001/pdf-chat-frontend:latest

# Run backend
docker run -d -p 8000:8000 --env-file ./backend/.env reddappa3001/pdf-chat-backend:latest
```

## Manual Local Setup

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

   ```env
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

   ```env
   VITE_API_URL=http://localhost:8000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000` (Docker) or `http://localhost:5173` (local development)
2. Upload a PDF document using the upload interface
3. Once the document is processed, you can start chatting with it
4. Type your questions in the chat interface and get AI-powered responses based on the PDF content

## Development

- Frontend runs on `http://localhost:3000` (Docker) or `http://localhost:5173` (local development)
- Backend API runs on `http://localhost:8000`
- API documentation is available at `http://localhost:8000/docs`

## License

This project is licensed under the MIT License - see the LICENSE file for details.
