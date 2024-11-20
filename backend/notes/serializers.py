from rest_framework import serializers
from .models import Note, Audio

class NoteSerializer(serializers.ModelSerializer):  
    class Meta:  
        model = Note  
        fields = ['id', 'title', 'description', 'created_at', 'updated_at']  

class AudioSerializer(serializers.ModelSerializer):
    class Meta:  
        model = Audio  
        fields = ['id', 'note', 'audio_file', 'uploaded_at']
    