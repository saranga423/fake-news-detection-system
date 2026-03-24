from urllib.parse import urlparse

from fastapi import APIRouter
from pydantic import BaseModel, HttpUrl


router = APIRouter(prefix="/url-analysis", tags=["URL Analysis"])


class UrlAnalysisRequest(BaseModel):
    url: HttpUrl


@router.post("/")
def analyze_url(payload: UrlAnalysisRequest):
    parsed = urlparse(str(payload.url))
    hostname = parsed.netloc.lower()

    is_https = parsed.scheme == "https"
    suspicious_keywords = ["click", "shock", "viral", "breaking", "alert", "exclusive"]
    keyword_hits = [word for word in suspicious_keywords if word in hostname or word in str(payload.url).lower()]

    credibility_score = 0.85 if is_https else 0.55
    if keyword_hits:
        credibility_score -= min(0.25, len(keyword_hits) * 0.05)

    credibility_score = max(0.0, min(1.0, credibility_score))

    return {
        "url": str(payload.url),
        "domain": hostname,
        "is_https": is_https,
        "suspicious_keywords_found": keyword_hits,
        "estimated_source_credibility": round(credibility_score, 4),
        "risk_level": "HIGH" if credibility_score < 0.45 else "MEDIUM" if credibility_score < 0.7 else "LOW",
    }