from django.db import models  
from django.contrib.auth.models import User  

class Note(models.Model):  
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Audio(models.Model):  
    note = models.ForeignKey(Note, related_name='audio_files', on_delete=models.CASCADE)  
    name = models.FileField(upload_to='audio/')  
    uploaded_at = models.DateTimeField(auto_now_add=True)