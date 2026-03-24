from pathlib import Path

import joblib
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

BASE_DIR = Path(__file__).resolve().parent.parent.parent
DATASET_PATH = BASE_DIR / "datasets" / "fake_news_dataset.csv"
OUTPUT_DIR = BASE_DIR / "trained_models"

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

df = pd.read_csv(DATASET_PATH)

# Adjust these column names if your CSV uses different names
text_col = "text"
label_col = "label"

X = df[text_col].astype(str)
y = df[label_col]

vectorizer = TfidfVectorizer(stop_words="english", max_features=5000)
X_vec = vectorizer.fit_transform(X)

model = LogisticRegression(max_iter=1000)
model.fit(X_vec, y)

joblib.dump(model, OUTPUT_DIR / "fake_news_model.pkl")
joblib.dump(vectorizer, OUTPUT_DIR / "vectorizer.pkl")

print("Model and vectorizer saved successfully.")
print(f"Model: {OUTPUT_DIR / 'fake_news_model.pkl'}")
print(f"Vectorizer: {OUTPUT_DIR / 'vectorizer.pkl'}")