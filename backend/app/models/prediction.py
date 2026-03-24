from datetime import datetime

from sqlalchemy import String, Text, Float, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class NewsPrediction(Base):
    __tablename__ = "news_predictions"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    text: Mapped[str] = mapped_column(Text, nullable=False)
    prediction: Mapped[str] = mapped_column(String(50), nullable=False)
    confidence: Mapped[float] = mapped_column(Float, nullable=False)
    explanation_keywords: Mapped[str | None] = mapped_column(Text, nullable=True)

    source_credibility: Mapped[float | None] = mapped_column(Float, nullable=True)
    sensationalism_score: Mapped[float | None] = mapped_column(Float, nullable=True)
    clickbait_probability: Mapped[float | None] = mapped_column(Float, nullable=True)
    bot_amplification_risk: Mapped[float | None] = mapped_column(Float, nullable=True)
    misinformation_risk: Mapped[float | None] = mapped_column(Float, nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )