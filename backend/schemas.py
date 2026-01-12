from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

# User Schemas
class UserBase(BaseModel):
    name: str
    email: str

class UserCreate(UserBase):
    password: str
    role: Optional[str] = "student"

class UserLogin(BaseModel):
    email: str
    password: str

class UserOut(UserBase):
    id: int
    role: str
    created_at: datetime
    class Config:
        from_attributes = True

# Token Schema
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
    role: Optional[str] = None

# Resource Post Schemas
class ResourcePostBase(BaseModel):
    title: str
    excerpt: Optional[str] = None
    content: str
    tags: Optional[str] = None
    category: str

class ResourcePostCreate(ResourcePostBase):
    pass

class ResourcePostOut(ResourcePostBase):
    id: int
    slug: str
    created_at: datetime
    author_id: int
    class Config:
        from_attributes = True

# Help Request Schemas
class HelpRequestBase(BaseModel):
    type: str # assignment, project
    subject: str
    description: str
    deadline: datetime
    budget_range: Optional[str] = None

class HelpRequestCreate(HelpRequestBase):
    pass

class HelpRequestUpdateStatus(BaseModel):
    status: str

class HelpRequestOut(HelpRequestBase):
    id: int
    status: str
    created_at: datetime
    student_id: int
    class Config:
        from_attributes = True

# Message Schemas
class MessageBase(BaseModel):
    message: str

class MessageCreate(MessageBase):
    pass

class MessageOut(MessageBase):
    id: int
    sender_id: int
    created_at: datetime
    class Config:
        from_attributes = True
