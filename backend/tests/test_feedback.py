from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_feedback_submission():
    response = client.post(
        "/api/v1/feedback/",
        json={
            "name": "Tester",
            "email": "tester@example.com",
            "message": "This system works well.",
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["message"] == "This system works well."