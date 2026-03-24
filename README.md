# Fake news Detection System

# 📌 Overview

The Fake News Detection System is a full-stack intelligent application designed to automatically identify misleading or false news content. The system analyzes textual input using machine learning models and provides not only predictions but also explainable insights, enabling users to understand why a piece of content is classified as fake or real.

# 🚀 Key Features

🔎 Fake News Classification
🧠 Explainable AI (keyword highlighting)
📊 Confidence & Credibility Score
🖥️ Modern React Dashboard
🔁 Feedback System for model improvement
⚡ Real-time prediction (FastAPI backend)

# 💡 Innovation

This project combines:

Automated fake news detection
Explainable AI for transparency
Feedback-driven improvement

Unlike black-box models, it provides interpretable results.

# 🏗️ System Architecture
 # Architecture Diagram

Flow

User Input (Text / URL)
        ↓
React Frontend (Dashboard UI)
        ↓
FastAPI Backend (REST API)
        ↓
ML Model (TF-IDF + Classifier)
        ↓
Prediction + Explanation
        ↓
UI Visualization + Feedback Loop

# 🛠️ Technology Stack

Frontend
React.js
Material UI (MUI)
Axios
Backend
FastAPI
Uvicorn
SQLAlchemy
Machine Learning
Scikit-learn
TF-IDF
Logistic Regression

# ⚙️ Installation

Clone Repo

```
git clone https://github.com/your-username/fake-news-detection-system.git
cd fake-news-detection-system

```

Backend

```
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
Frontend

```
cd frontend
npm install
npm start

```



