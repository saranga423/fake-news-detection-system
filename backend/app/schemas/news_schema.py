# News Schema for Fake News Detection
from pydantic import BaseModel, Field
class NewsRequest(BaseModel):
    title: str = Field(..., min_length=5, max_length=200)
    content: str = Field(..., min_length=20, max_length=5000)
    