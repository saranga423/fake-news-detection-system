from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict, HttpUrl


class PredictionRequest(BaseModel):
    text: str = Field(..., min_length=10)
    source_url: HttpUrl | None = None


class PredictionResponse(BaseModel):
    id: int
    prediction: str
    confidence: float
    explanation_keywords: list[str]

    source_credibility: float
    sensationalism_score: float
    clickbait_probability: float
    bot_amplification_risk: float
    misinformation_risk: float


class HistoryResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    text: str
    prediction: str
    confidence: float
    explanation_keywords: list[str]
    misinformation_risk: float | None
    source_credibility: float | None
    created_at: datetime