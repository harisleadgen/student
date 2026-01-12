from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import models, schemas, database, auth

router = APIRouter(
    prefix="/requests",
    tags=["requests"]
)

@router.post("/", response_model=schemas.HelpRequestOut)
def create_request(req: schemas.HelpRequestCreate, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    db_req = models.HelpRequest(**req.dict(), student_id=current_user.id)
    db.add(db_req)
    db.commit()
    db.refresh(db_req)
    return db_req

@router.get("/", response_model=List[schemas.HelpRequestOut])
def read_requests(db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    if current_user.role == "admin":
        requests = db.query(models.HelpRequest).all()
    else:
        requests = db.query(models.HelpRequest).filter(models.HelpRequest.student_id == current_user.id).all()
    return requests

@router.get("/{id}", response_model=schemas.HelpRequestOut)
def read_request(id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    req = db.query(models.HelpRequest).filter(models.HelpRequest.id == id).first()
    if req is None:
        raise HTTPException(status_code=404, detail="Request not found")
    if current_user.role != "admin" and req.student_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
    return req

@router.put("/{id}/status", response_model=schemas.HelpRequestOut)
def update_status(id: int, status_update: schemas.HelpRequestUpdateStatus, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_admin)):
    req = db.query(models.HelpRequest).filter(models.HelpRequest.id == id).first()
    if req is None:
        raise HTTPException(status_code=404, detail="Request not found")
    req.status = status_update.status
    db.commit()
    db.refresh(req)
    return req

@router.post("/{id}/messages", response_model=schemas.MessageOut)
def create_message(id: int, msg: schemas.MessageCreate, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    req = db.query(models.HelpRequest).filter(models.HelpRequest.id == id).first()
    if req is None:
        raise HTTPException(status_code=404, detail="Request not found")
    if current_user.role != "admin" and req.student_id != current_user.id:
         raise HTTPException(status_code=403, detail="Not authorized")
    
    db_msg = models.Message(**msg.dict(), request_id=id, sender_id=current_user.id)
    db.add(db_msg)
    db.commit()
    db.refresh(db_msg)
    return db_msg

@router.get("/{id}/messages", response_model=List[schemas.MessageOut])
def read_messages(id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    req = db.query(models.HelpRequest).filter(models.HelpRequest.id == id).first()
    if req is None:
        raise HTTPException(status_code=404, detail="Request not found")
    if current_user.role != "admin" and req.student_id != current_user.id:
         raise HTTPException(status_code=403, detail="Not authorized")
    
    return req.messages
