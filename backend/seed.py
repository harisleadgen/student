from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models
import auth

db = SessionLocal()

def seed():
    # Check if admin exists
    admin_email = "admin@example.com"
    admin = db.query(models.User).filter(models.User.email == admin_email).first()
    if not admin:
        print("Creating admin user...")
        hashed_password = auth.get_password_hash("admin123")
        admin = models.User(
            email=admin_email,
            name="Admin User",
            password_hash=hashed_password,
            role="admin"
        )
        db.add(admin)
    
    # Check if student exists
    student_email = "student@example.com"
    student = db.query(models.User).filter(models.User.email == student_email).first()
    if not student:
        print("Creating student user...")
        hashed_password = auth.get_password_hash("student123")
        student = models.User(
            email=student_email,
            name="John Doe",
            password_hash=hashed_password,
            role="student"
        )
        db.add(student)
        db.commit() # Commit to get student ID

        # Create sample request
        print("Creating sample help request...")
        req = models.HelpRequest(
            student_id=student.id,
            type="assignment",
            subject="Calculus Integration Problem",
            description="Need help with integrals of trigonometric functions.",
            deadline=auth.datetime.utcnow(),
            status="New"
        )
        db.add(req)
        
        # Create sample resource
        print("Creating sample resource...")
        # Need admin user object
        db.refresh(admin) 
        post = models.ResourcePost(
            author_id=admin.id,
            title="How to Write a Research Paper",
            slug="how-to-write-research-paper",
            excerpt="A comprehensive guide to academic writing.",
            content="This is the full content of the guide...",
            category="Guides",
            tags="writing, research"
        )
        db.add(post)

    db.commit()
    print("Database seeded successfully!")

if __name__ == "__main__":
    seed()
