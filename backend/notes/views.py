from rest_framework import viewsets
from rest_framework import generics
from rest_framework.views import APIView 
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.utils.decorators import method_decorator  
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin

from .models import Note, Audio
from .serializers import NoteSerializer, AudioSerializer

# Create Note  
# class NoteCreateView(generics.CreateAPIView):
#     queryset = Note.objects.all()
#     serializer_class = NoteSerializer
#     permission_classes = [IsAuthenticated]
#     authentication_classes = [JWTAuthentication]

#     def perform_create(self, serializer):
#         print(self.request.user)
#         serializer.save(user=self.request.user)

# List Notes  
class NoteListViewSet(ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin, viewsets.GenericViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        print(self.request.user)
        super().perform_update(serializer) 

# Retrieve Note  
# class NoteDetailView(generics.RetrieveAPIView):  
#     queryset = Note.objects.all()  
#     serializer_class = NoteSerializer  
#     permission_classes = [IsAuthenticated]  

#     def get_queryset(self):  
#         return self.queryset.filter(user=self.request.user)  

# # Update Note  
# class NoteUpdateView(generics.UpdateAPIView):  
#     queryset = Note.objects.all()  
#     serializer_class = NoteSerializer  
#     permission_classes = [IsAuthenticated]  

#     def get_queryset(self):  
#         return self.queryset.filter(user=self.request.user)  

# # Delete Note  
# class NoteDeleteView(generics.DestroyAPIView):  
#     queryset = Note.objects.all()  
#     serializer_class = NoteSerializer  
#     permission_classes = [IsAuthenticated]  

#     def get_queryset(self):  
#         return self.queryset.filter(user=self.request.user)  

class AudioViewSet(viewsets.ModelViewSet):
    queryset = Audio.objects.all()
    serializer_class = AudioSerializer  
    permission_classes = [IsAuthenticated]  

    def perform_create(self, serializer):  
        serializer.save()
