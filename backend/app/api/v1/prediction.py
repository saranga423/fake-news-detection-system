from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.prediction import PredictionRequest, PredictionResponse
from app.services.prediction_service import analyze_news

router = APIRouter(prefix="/prediction", tags=["Prediction"])


@router.post("/", response_model=PredictionResponse)
def predict(payload: PredictionRequest, db: Session = Depends(get_db)):
    source_url = str(payload.source_url) if payload.source_url else None
    return analyze_news(db, payload.text, source_url)