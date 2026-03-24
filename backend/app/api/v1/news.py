import json

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.prediction import NewsPrediction

router = APIRouter(prefix="/news", tags=["News"])


@router.get("/history")
def get_news_history(limit: int = 20, db: Session = Depends(get_db)):
    rows = (
        db.query(NewsPrediction)
        .order_by(NewsPrediction.created_at.desc())
        .limit(limit)
        .all()
    )

    results = []
    for row in rows:
        keywords = row.explanation_keywords
        if isinstance(keywords, str):
            try:
                keywords = json.loads(keywords)
            except json.JSONDecodeError:
                keywords = []

        results.append(
            {
                "id": row.id,
                "text": row.text,
                "prediction": row.prediction,
                "confidence": row.confidence,
                "explanation_keywords": keywords,
                "source_credibility": row.source_credibility,
                "sensationalism_score": row.sensationalism_score,
                "clickbait_probability": row.clickbait_probability,
                "bot_amplification_risk": row.bot_amplification_risk,
                "misinformation_risk": row.misinformation_risk,
                "created_at": row.created_at,
            }
        )

    return results