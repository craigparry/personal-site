from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr
from typing import List, Optional

# Initialize the router for user management
router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

# --- PYDANTIC SCHEMAS ---

class UserBase(BaseModel):
    username: str
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str  # Kept inbound for creation, but filtered out on output

class UserOut(UserBase):
    id: int
    is_active: bool

    class Config:
        # Allows Pydantic to read data if you plug in an ORM like SQLAlchemy later
        from_attributes = True


# --- IN-MEMORY DATABASE MOCK ---
# In production, replace this with your database layer (e.g., SQLAlchemy)
USERS_DB = [
    {"id": 1, "username": "johndoe", "email": "john@example.com", "full_name": "John Doe", "is_active": True},
    {"id": 2, "username": "janedoe", "email": "jane@example.com", "full_name": "Jane Doe", "is_active": True}
]


# --- ENDPOINTS ---

@router.post("/", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def create_user(user_in: UserCreate):
    """
    Create a new user. 
    Accepts password but filters it out in the response using response_model=UserOut.
    """
    # Check if username already exists
    if any(u["username"] == user_in.username for u in USERS_DB):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Username already registered"
        )
    
    # Generate a mock ID and save the user
    new_user_id = len(USERS_DB) + 1
    new_user = {
        "id": new_user_id,
        "is_active": True,
        **user_in.model_dump() # Unpacks username, email, full_name, password
    }
    
    USERS_DB.append(new_user)
    return new_user


@router.get("/", response_model=List[UserOut])
def get_users(skip: int = 0, limit: int = 10):
    """
    Get a paginated list of users using query parameters.
    """
    return USERS_DB[skip : skip + limit]


@router.get("/{user_id}", response_model=UserOut)
def get_user_by_id(user_id: int):
    """
    Get a single user by their path parameter ID.
    """
    user = next((u for u in USERS_DB if u["id"] == user_id), None)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"User with ID {user_id} not found"
        )
    return user
