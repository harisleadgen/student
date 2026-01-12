# Student Assignments & Projects Help Platform

A full-stack platform connecting students with experts for assignment and project help.

## Tech Stack

- **Frontend**: Next.js 14+ (App Router), Tailwind CSS
- **Backend**: FastAPI, SQLAlchemy, Pydantic
- **Database**: SQLite (Development), PostgreSQL (Production ready)
- **Auth**: JWT (OAuth2PasswordBearer)

## Features

- **Student Portal**: Submit requests, track status, messaging, file uploads.
- **Admin Portal**: Manage requests, update status, manage resources.
- **Public Pages**: SEO-optimized Home, Services, Resources/Blog.

## Local Setup

### Prerequisites
- Python 3.9+
- Node.js 18+

### Backend Setup

1.  Navigate to `backend`:
    ```bash
    cd backend
    ```
2.  Create virtual environment:
    ```bash
    python -m venv venv
    .\venv\Scripts\activate  # Windows
    # source venv/bin/activate # Linux/Mac
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Run Migrations:
    ```bash
    alembic upgrade head
    ```
5.  Seed Database (Creates Admin and Student users):
    ```bash
    python seed.py
    ```
6.  Start Server:
    ```bash
    uvicorn main:app --reload
    ```
    API will be running at `http://localhost:8000`. API Docs at `http://localhost:8000/docs`.

### Frontend Setup

1.  Navigate to `frontend`:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start Dev Server:
    ```bash
    npm run dev
    ```
    App will be running at `http://localhost:3000`.

## Deployment

### Backend (Render/Railway)
1.  Set `SQLALCHEMY_DATABASE_URL` env var to your PostgreSQL connection string.
2.  Update `alembic.ini` or use env vars in `env.py` to point to production DB.
3.  Build command: `pip install -r requirements.txt`
4.  Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Frontend (Vercel)
1.  Import repository to Vercel.
2.  Framework preset: Next.js.
3.  Env Vars: None needed for static build if API URL is hardcoded, but recommended to use `NEXT_PUBLIC_API_URL`.
    - Update `src/lib/axios.ts` to use `process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'`.

## Default Users (Seed)
- **Admin**: `admin@example.com` / `admin123`
- **Student**: `student@example.com` / `student123`
