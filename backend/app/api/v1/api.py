from fastapi import APIRouter

from app.api.v1.auth import router as auth_router
from app.api.v1.prediction import router as prediction_router
from app.api.v1.feedback import router as feedback_router
from app.api.v1.dashboard import router as dashboard_router
from app.api.v1.explainability import router as explainability_router
from app.api.v1.news import router as news_router
from app.api.v1.url_analysis import router as url_analysis_router

api_router = APIRouter()

api_router.include_router(auth_router)
api_router.include_router(prediction_router)
api_router.include_router(feedback_router)
api_router.include_router(dashboard_router)
api_router.include_router(explainability_router)
api_router.include_router(news_router)
api_router.include_router(url_analysis_router)