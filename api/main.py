from fastapi import FastAPI
# Assuming your router file is named 'users.py'
from users import router as users_router 

# Initialize the core FastAPI application instance
app = FastAPI(
    title="User Management API",
    version="1.0.0"
)

# Register your user management endpoints
app.include_router(users_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the User Management Service. Visit /docs for API documentation."}