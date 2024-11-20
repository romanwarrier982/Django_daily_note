from django.db import models  
from django.contrib.auth.models import User  

class Note(models.Model):  
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    audio_files = models.FileField(upload_to='audio/', blank=True, null=True)