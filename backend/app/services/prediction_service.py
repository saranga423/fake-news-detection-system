from sqlalchemy.orm import Session

from app.crud import create_prediction
from app.ml.predictor import predict_news


def analyze_news(db: Session, text: str, source_url: str | None = None):
    ml_result = predict_news(text)

    source_credibility = 0.72
    sensationalism_score = 0.41
    clickbait_probability = 0.38
    bot_amplification_risk = 0.29

    misinformation_risk = round(
        (1 - source_credibility) * 0.35
        + sensationalism_score * 0.25
        + clickbait_probability * 0.20
        + bot_amplification_risk * 0.20,
        4,
    )

    saved = create_prediction(
        db,
        text=text,
        prediction=ml_result["prediction"],
        confidence=ml_result["confidence"],
        explanation_keywords=ml_result["keywords"],
        source_credibility=source_credibility,
        sensationalism_score=sensationalism_score,
        clickbait_probability=clickbait_probability,
        bot_amplification_risk=bot_amplification_risk,
        misinformation_risk=misinformation_risk,
    )

    return {
        "id": saved.id,
        "prediction": saved.prediction,
        "confidence": saved.confidence,
        "explanation_keywords": ml_result["keywords"],
        "source_credibility": saved.source_credibility,
        "sensationalism_score": saved.sensationalism_score,
        "clickbait_probability": saved.clickbait_probability,
        "bot_amplification_risk": saved.bot_amplification_risk,
        "misinformation_risk": saved.misinformation_risk,
    }