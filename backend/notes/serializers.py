from rest_framework import serializers  
from django.contrib.auth.models import User
from .models import Note, Audio

class NoteSerializer(serializers.ModelSerializer):  
    class Meta:  
        model = Note  
        fields = ['id', 'title', 'description', 'user', 'created_at']  

class AudioSerializer(serializers.ModelSerializer):  
    class Meta:  
        model = Audio  
        fields = ['id', 'note', 'audio_file', 'uploaded_at']

class UserSerializer(serializers.ModelSerializer):  
    class Meta:  
        model = User  
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()