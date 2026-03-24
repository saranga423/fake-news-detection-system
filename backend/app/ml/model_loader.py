import joblib

from app.config import settings

model = joblib.load(settings.MODEL_PATH)
vectorizer = joblib.load(settings.VECTORIZER_PATH)