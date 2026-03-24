from pydantic import BaseModel
from typing import List


class FeatureWeight(BaseModel):
    label: str
    value: float
    color: str | None = None


class ExplanationFragment(BaseModel):
    type: str
    tone: str
    weight: str
    text: str
    bullets: List[str]


class GlossaryItem(BaseModel):
    term: str
    desc: str


class ExplainabilityReportRequest(BaseModel):
    title: str
    article_title: str
    credibility_score: float
    prediction: str
    feature_weights: List[FeatureWeight]
    explanation_fragments: List[ExplanationFragment]
    glossary_items: List[GlossaryItem]
    recommendation: str