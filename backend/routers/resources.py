from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import models, schemas, database, auth

router = APIRouter(
    prefix="/resources",
    tags=["resources"]
)

@router.post("/", response_model=schemas.ResourcePostOut)
def create_resource(post: schemas.ResourcePostCreate, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_admin)):
    # Simple slug generation (ensure unique in real app)
    slug = post.title.lower().replace(" ", "-")
    db_post = models.ResourcePost(**post.dict(), slug=slug, author_id=current_user.id)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

@router.get("/", response_model=List[schemas.ResourcePostOut])
def read_resources(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    posts = db.query(models.ResourcePost).offset(skip).limit(limit).all()
    return posts

@router.get("/{slug}", response_model=schemas.ResourcePostOut)
def read_resource(slug: str, db: Session = Depends(database.get_db)):
    post = db.query(models.ResourcePost).filter(models.ResourcePost.slug == slug).first()
    if post is None:
        raise HTTPException(status_code=404, detail="Resource not found")
    return post

@router.delete("/{id}")
def delete_resource(id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_admin)):
    post = db.query(models.ResourcePost).filter(models.ResourcePost.id == id).first()
    if post is None:
        raise HTTPException(status_code=404, detail="Resource not found")
    db.delete(post)
    db.commit()
    return {"ok": True}
