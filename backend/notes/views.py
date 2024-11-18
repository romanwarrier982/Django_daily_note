from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import generics, viewsets, permissions, status
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Note, Audio
from .serializers import NoteSerializer, AudioSerializer, UserLoginSerializer, UserSerializer

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

class LoginView(generics.GenericAPIView):
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):  
        user = authenticate(username=request.data['username'], password=request.data['password'])  
        if user:  
            token = AccessToken.for_user(user)  
            return Response({'token': str(token)}, status=status.HTTP_200_OK)  
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)  