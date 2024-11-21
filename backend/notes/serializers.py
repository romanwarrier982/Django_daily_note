from rest_framework import serializers
from .models import Note, Audio


class AudioSerializer(serializers.ModelSerializer):
    class Meta:  
        model = Audio  
        fields = ['id', 'name', 'uploaded_at']
class NoteSerializer(serializers.ModelSerializer):
    audio_files = serializers.ListField(
        child=serializers.FileField(), write_only=True, required=False
    )
    # audio_files = AudioSerializer(many=True, read_only=True)
    
    class Meta:  
        model = Note  
        fields = ['id', 'title', 'description', 'created_at', 'updated_at', 'audio_files']
    
    def create(self, validated_data):
        audio_data = validated_data.pop('audio_files', [])
        note = Note.objects.create(**validated_data)
        for audio in audio_data:
            Audio.objects.create(note=note, name=audio)
        return note  
    
    def update(self, instance, validated_data):
        audio_data = validated_data.pop('audio_files', [])  

        # Update the note instance  
        instance.title = validated_data.get('title', instance.title)  
        instance.description = validated_data.get('description', instance.description)  
        instance.save()

        # Handle audio files (update or create)
        for audio in audio_data:
            Audio.objects.create(note=instance, name=audio)

        return instance


    