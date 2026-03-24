from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_register_user():
    response = client.post(
        "/api/v1/auth/register",
        json={
            "full_name": "Test User",
            "email": "testuser@example.com",
            "password": "Pass123!",
        },
    )

    assert response.status_code in [200, 400]


def test_login_user():
    client.post(
        "/api/v1/auth/register",
        json={
            "full_name": "Test User",
            "email": "testuser@example.com",
            "password": "Pass123!",
        },
    )

    response = client.post(
        "/api/v1/auth/login",
        json={
            "email": "testuser@example.com",
            "password": "Pass123!",
        },
    )

    assert response.status_code == 200
    data = response.json()

    assert "access_token" in data
    assert data["token_type"] == "bearer"