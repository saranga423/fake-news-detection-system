from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_prediction():
    response = client.post(
        "/api/v1/prediction/",
        json={
            "text": "Scientists confirm drinking hot water cures all cancers instantly"
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert "prediction" in data
    assert "confidence" in data
    assert isinstance(data["confidence"], float)