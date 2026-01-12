from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    role = Column(String, default="student")  # student, admin, contributor
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    requests = relationship("HelpRequest", back_populates="student")
    messages = relationship("Message", back_populates="sender")
    resource_posts = relationship("ResourcePost", back_populates="author")


class ResourcePost(Base):
    __tablename__ = "resource_posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    slug = Column(String, unique=True, index=True)
    excerpt = Column(String)
    content = Column(Text)
    tags = Column(String) # Comma separated
    category = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    author_id = Column(Integer, ForeignKey("users.id"))

    author = relationship("User", back_populates="resource_posts")


class HelpRequest(Base):
    __tablename__ = "help_requests"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id"))
    type = Column(String) # assignment, project, exam_prep
    subject = Column(String)
    description = Column(Text)
    deadline = Column(DateTime)
    budget_range = Column(String, nullable=True)
    status = Column(String, default="New") # New, In Review, In Progress, Delivered, Closed
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    student = relationship("User", back_populates="requests")
    messages = relationship("Message", back_populates="request")
    files = relationship("FileUpload", back_populates="request")


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    request_id = Column(Integer, ForeignKey("help_requests.id"))
    sender_id = Column(Integer, ForeignKey("users.id"))
    message = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    request = relationship("HelpRequest", back_populates="messages")
    sender = relationship("User", back_populates="messages")


class FileUpload(Base):
    __tablename__ = "file_uploads"

    id = Column(Integer, primary_key=True, index=True)
    request_id = Column(Integer, ForeignKey("help_requests.id"))
    uploaded_by = Column(Integer, ForeignKey("users.id"))
    filename = Column(String)
    url = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    request = relationship("HelpRequest", back_populates="files")
