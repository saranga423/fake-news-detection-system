import json
from sqlalchemy.orm import Session

from app.models.prediction import NewsPrediction


def create_prediction(db: Session, **kwargs):
    if isinstance(kwargs.get("explanation_keywords"), list):
        kwargs["explanation_keywords"] = json.dumps(kwargs["explanation_keywords"])

    prediction = NewsPrediction(**kwargs)
    db.add(prediction)
    db.commit()
    db.refresh(prediction)
    return prediction


def get_prediction_history(db: Session, limit: int = 20):
    return (
        db.query(NewsPrediction)
        .order_by(NewsPrediction.created_at.desc())
        .limit(limit)
        .all()
    )