from django.test import TestCase

# Create your tests here.
import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth.models import User
from notes.models import Note, Audio
from django.core.files.uploadedfile import SimpleUploadedFile


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def create_user():
    def make_user(username, email, password):
        user = User.objects.create_user(username=username, email=email, password=password)
        return user
    return make_user


@pytest.fixture
def auth_client(api_client, create_user):
    user = create_user("testuser", "testuser@example.com", "password123")
    login_url = reverse("token_obtain_pair")
    response = api_client.post(login_url, {"username": user.username, "password": "password123"})
    api_client.credentials(HTTP_AUTHORIZATION=f"Bearer {response.data['access']}")
    return api_client, user


@pytest.fixture
def create_note(auth_client):
    def make_note(title, description, user):
        return Note.objects.create(user=user, title=title, description=description)
    return make_note


@pytest.mark.django_db
def test_create_note_with_audio(auth_client):
    client, user = auth_client
    url = reverse("notes-list")
    
    # Mock audio file
    audio_file = SimpleUploadedFile("test_audio.mp3", b"file_content", content_type="audio/mp3")
    
    payload = {
        "title": "Sample Note",
        "description": "This is a test note",
        "audio_files": [audio_file]
    }
    response = client.post(url, payload)
    assert response.status_code == status.HTTP_201_CREATED
    assert response.data["message"] == "Note and audio files created successfully"
    assert Note.objects.filter(user=user, title="Sample Note").exists()
    assert Audio.objects.filter(note__title="Sample Note").count() == 1


@pytest.mark.django_db
def test_retrieve_note_with_audio(auth_client, create_note):
    client, user = auth_client
    note = create_note("Sample Note", "This is a test note", user)
    Audio.objects.create(note=note, name="test_audio.mp3")
    
    url = reverse("notes-detail", args=[note.id])
    response = client.get(url)
    
    assert response.status_code == status.HTTP_200_OK
    assert response.data["title"] == "Sample Note"
    assert len(response.data["audio_files"]) == 1
    assert response.data["audio_files"][0]["name"] == "test_audio.mp3"


@pytest.mark.django_db
def test_update_note_with_audio(auth_client, create_note):
    client, user = auth_client
    note = create_note("Sample Note", "Initial Description", user)
    
    # Mock new audio file
    audio_file = SimpleUploadedFile("new_audio.mp3", b"new_file_content", content_type="audio/mp3")
    
    url = reverse("notes-detail", args=[note.id])
    payload = {
        "title": "Updated Note",
        "description": "Updated Description",
        "audio_files": [audio_file]
    }
    response = client.put(url, payload)
    
    assert response.status_code == status.HTTP_200_OK
    assert response.data["message"] == "Note and audio files updated successfully"
    updated_note = Note.objects.get(id=note.id)
    assert updated_note.title == "Updated Note"
    assert Audio.objects.filter(note=updated_note).count() == 1


@pytest.mark.django_db
def test_delete_note(auth_client, create_note):
    client, user = auth_client
    note = create_note("Sample Note", "This is a test note", user)
    url = reverse("notes-detail", args=[note.id])
    
    response = client.delete(url)
    assert response.status_code == status.HTTP_204_NO_CONTENT
    assert not Note.objects.filter(id=note.id).exists()
    assert not Audio.objects.filter(note=note).exists()


@pytest.mark.django_db
def test_list_notes(auth_client, create_note):
    client, user = auth_client
    create_note("Note 1", "Description 1", user)
    create_note("Note 2", "Description 2", user)
    
    url = reverse("notes-list")
    response = client.get(url)
    
    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) == 2
    titles = [note["title"] for note in response.data]
    assert "Note 1" in titles
    assert "Note 2" in titles


@pytest.mark.django_db
def test_note_access_restricted_to_owner(auth_client, create_note, create_user):
    client, user = auth_client
    other_user = create_user("otheruser", "other@example.com", "password123")
    note = create_note("Other User Note", "This note belongs to another user", other_user)
    
    url = reverse("notes-detail", args=[note.id])
    response = client.get(url)
    
    assert response.status_code == status.HTTP_404_NOT_FOUND

@pytest.mark.django_db
def test_create_note_invalid_payload(auth_client):
    client, user = auth_client
    url = reverse("notes-list")
    payload = {
        "title": "",  # Invalid because title is required
        "description": "This is a test note"
    }
    response = client.post(url, payload)
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "title" in response.data  # Validation error for missing title

@pytest.mark.django_db
def test_update_note_invalid_payload(auth_client, create_note):
    client, user = auth_client
    note = create_note("Valid Title", "Valid Description", user)
    url = reverse("notes-detail", args=[note.id])
    payload = {
        "title": "",  # Invalid because title is required
        "description": "Updated Description"
    }
    response = client.put(url, payload)
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "title" in response.data  # Validation error for missing title