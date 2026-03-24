from datetime import datetime
from pydantic import BaseModel, EmailStr, ConfigDict


class FeedbackCreate(BaseModel):
    name: str | None = None
    email: EmailStr | None = None
    message: str


class FeedbackResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str | None
    email: EmailStr | None
    message: str
    created_at: datetime