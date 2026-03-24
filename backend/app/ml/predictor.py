from app.ml.model_loader import model, vectorizer
from app.ml.preprocessing import clean_text


def predict_news(text: str):
    cleaned = clean_text(text)
    vector = vectorizer.transform([cleaned])

    prediction = model.predict(vector)[0]
    probabilities = model.predict_proba(vector)[0]

    confidence = float(max(probabilities))
    label = "FAKE" if int(prediction) == 1 else "REAL"

    return {
        "prediction": label,
        "confidence": confidence,
        "keywords": cleaned.split()[:8],
    }