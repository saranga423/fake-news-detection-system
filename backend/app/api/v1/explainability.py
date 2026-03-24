import json

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.prediction import NewsPrediction

router = APIRouter(prefix="/explainability", tags=["Explainability"])


@router.get("/{prediction_id}")
def get_explainability(prediction_id: int, db: Session = Depends(get_db)):
    prediction = (
        db.query(NewsPrediction)
        .filter(NewsPrediction.id == prediction_id)
        .first()
    )

    if prediction is None:
        raise HTTPException(status_code=404, detail="Prediction not found")

    keywords = prediction.explanation_keywords
    if isinstance(keywords, str):
        try:
            keywords = json.loads(keywords)
        except json.JSONDecodeError:
            keywords = []

    return {
        "id": prediction.id,
        "text": prediction.text,
        "prediction": prediction.prediction,
        "confidence": prediction.confidence,
        "explanation_keywords": keywords,
        "source_credibility": prediction.source_credibility,
        "sensationalism_score": prediction.sensationalism_score,
        "clickbait_probability": prediction.clickbait_probability,
        "bot_amplification_risk": prediction.bot_amplification_risk,
        "misinformation_risk": prediction.misinformation_risk,
        "created_at": prediction.created_at,
    }