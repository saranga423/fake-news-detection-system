import json

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models.prediction import NewsPrediction

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/summary")
def get_dashboard_summary(db: Session = Depends(get_db)):
    total_predictions = db.query(func.count(NewsPrediction.id)).scalar() or 0

    fake_count = (
        db.query(func.count(NewsPrediction.id))
        .filter(NewsPrediction.prediction == "FAKE")
        .scalar()
        or 0
    )

    real_count = (
        db.query(func.count(NewsPrediction.id))
        .filter(NewsPrediction.prediction == "REAL")
        .scalar()
        or 0
    )

    avg_confidence = db.query(func.avg(NewsPrediction.confidence)).scalar()
    avg_misinformation_risk = db.query(func.avg(NewsPrediction.misinformation_risk)).scalar()

    recent_items = (
        db.query(NewsPrediction)
        .order_by(NewsPrediction.created_at.desc())
        .limit(5)
        .all()
    )

    recent_predictions = []
    for item in recent_items:
        keywords = item.explanation_keywords
        if isinstance(keywords, str):
            try:
                keywords = json.loads(keywords)
            except json.JSONDecodeError:
                keywords = []

        recent_predictions.append(
            {
                "id": item.id,
                "prediction": item.prediction,
                "confidence": item.confidence,
                "created_at": item.created_at,
                "keywords": keywords,
            }
        )

    return {
        "total_predictions": total_predictions,
        "fake_count": fake_count,
        "real_count": real_count,
        "average_confidence": round(float(avg_confidence), 4) if avg_confidence is not None else 0.0,
        "average_misinformation_risk": round(float(avg_misinformation_risk), 4)
        if avg_misinformation_risk is not None
        else 0.0,
        "recent_predictions": recent_predictions,
    }