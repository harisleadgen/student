from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import users, resources, requests
import database

app = FastAPI(title="Student Assignments & Projects Help")

# CORS (Allow all for development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(resources.router)
app.include_router(requests.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Student Help API"}
