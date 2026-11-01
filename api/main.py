from fastapi import FastAPI
# Assuming your router file is named 'users.py'
from users import router as users_router 
from fastapi.middleware.cors import CORSMiddleware
from os import getenv

# Initialize the core FastAPI application instance
app = FastAPI(
    title="User Management API",
    version="1.0.0"
)
origins = []
FRONTEND_URL = getenv(
    "FRONTEND_URL",
    "http://localhost:3000"
)
origins.append(FRONTEND_URL)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register your user management endpoints
app.include_router(users_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the User Management Service. Visit /docs for API documentation."}