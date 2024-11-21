import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from rest_framework import status


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def create_user():
    def make_user(username, email, password):
        user = User.objects.create_user(username=username, email=email, password=password)
        return user
    return make_user


@pytest.mark.django_db
def test_signup_success(api_client):
    url = reverse("signup")
    payload = {
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "strongpassword123",
        "password2": "strongpassword123",
    }
    response = api_client.post(url, payload)
    assert response.status_code == status.HTTP_201_CREATED
    assert User.objects.filter(username="testuser").exists()


@pytest.mark.django_db
def test_signup_password_mismatch(api_client):
    url = reverse("signup")
    payload = {
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "strongpassword123",
        "password2": "wrongpassword123",
    }
    response = api_client.post(url, payload)
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "password2" in response.data


@pytest.mark.django_db
def test_signup_duplicate_email(api_client, create_user):
    create_user("existinguser", "testuser@example.com", "password123")
    url = reverse("signup")
    payload = {
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "strongpassword123",
        "password2": "strongpassword123",
    }
    response = api_client.post(url, payload)
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "email" in response.data


@pytest.mark.django_db
def test_login_with_username(api_client, create_user):
    user = create_user("testuser", "testuser@example.com", "password123")
    url = reverse("token_obtain_pair")
    payload = {
        "username": user.username,
        "password": "password123",
    }
    response = api_client.post(url, payload)
    assert response.status_code == status.HTTP_200_OK
    assert "access" in response.data
    assert "refresh" in response.data


@pytest.mark.django_db
def test_login_with_email(api_client, create_user):
    user = create_user("testuser", "testuser@example.com", "password123")
    url = reverse("token_obtain_pair")
    payload = {
        "username": user.email,  # Using email instead of username
        "password": "password123",
    }
    response = api_client.post(url, payload)
    assert response.status_code == status.HTTP_200_OK
    assert "access" in response.data
    assert "refresh" in response.data


@pytest.mark.django_db
def test_login_invalid_credentials(api_client):
    url = reverse("token_obtain_pair")
    payload = {
        "username": "nonexistentuser",
        "password": "wrongpassword",
    }
    response = api_client.post(url, payload)
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert "No active account found with the given credentials" in response.data["detail"]


@pytest.mark.django_db
def test_token_refresh(api_client, create_user):
    user = create_user("testuser", "testuser@example.com", "password123")
    login_url = reverse("token_obtain_pair")
    refresh_url = reverse("token_refresh")

    # Obtain tokens
    login_response = api_client.post(login_url, {"username": user.username, "password": "password123"})
    assert login_response.status_code == status.HTTP_200_OK

    refresh_token = login_response.data["refresh"]

    # Use refresh token to get a new access token
    refresh_response = api_client.post(refresh_url, {"refresh": refresh_token})
    assert refresh_response.status_code == status.HTTP_200_OK
    assert "access" in refresh_response.data

@pytest.mark.django_db
def test_login_with_nonexistent_email(api_client):
    url = reverse("token_obtain_pair")
    payload = {
        "username": "nonexistent@example.com",  # Email that does not exist
        "password": "password123",
    }
    response = api_client.post(url, payload)
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert response.data["detail"] == "No user found with this email"