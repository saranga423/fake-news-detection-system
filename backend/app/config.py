from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


BASE_DIR = Path(__file__).resolve().parent.parent


class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./fake_news.db"
    SECRET_KEY: str = "change-this-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    BACKEND_CORS_ORIGINS: list[str] = ["http://localhost:3000"]

    MODEL_PATH: str = str(BASE_DIR / "trained_models" / "fake_news_model.pkl")
    VECTORIZER_PATH: str = str(BASE_DIR / "trained_models" / "vectorizer.pkl")

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()