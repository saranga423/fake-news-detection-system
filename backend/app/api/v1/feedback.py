from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.feedback import FeedbackCreate, FeedbackResponse
from app.crud import create_feedback

router = APIRouter(prefix="/feedback", tags=["Feedback"])


@router.post("/", response_model=FeedbackResponse)
def submit_feedback(payload: FeedbackCreate, db: Session = Depends(get_db)):
    return create_feedback(
        db,
        name=payload.name,
        email=payload.email,
        message=payload.message,
    )