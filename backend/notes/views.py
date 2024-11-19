from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import generics, viewsets, permissions, status
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .models import Note, Audio
from .serializers import NoteSerializer, AudioSerializer, UserSerializer
from rest_framework.permissions import AllowAny  
from rest_framework_simplejwt.views import TokenObtainPairView 

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):  
        return Note.objects.filter(user=self.request.user)  

    def perform_create(self, serializer):  
        serializer.save(user=self.request.user)  

class AudioViewSet(viewsets.ModelViewSet):
    queryset = Audio.objects.all()
    serializer_class = AudioSerializer  
    permission_classes = [IsAuthenticated]  

    def perform_create(self, serializer):  
        serializer.save()

class RegisterView(generics.CreateAPIView):  
    queryset = User.objects.all()  
    serializer_class = UserSerializer    

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)