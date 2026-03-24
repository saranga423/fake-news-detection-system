from sqlalchemy.orm import Session

from app.models.feedback import Feedback


def create_feedback(db: Session, *, name: str | None, email: str | None, message: str):
    feedback = Feedback(name=name, email=email, message=message)
    db.add(feedback)
    db.commit()
    db.refresh(feedback)
    return feedback