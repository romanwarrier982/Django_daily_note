from rest_framework import viewsets, status  
from rest_framework.permissions import IsAuthenticated  
from rest_framework_simplejwt.authentication import JWTAuthentication  
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin  
from rest_framework.response import Response  

from .models import Note, Audio  # Ensure you import your Audio model  
from .serializers import NoteSerializer, AudioSerializer  # Ensure you import the Audio serializer as well  

class NoteViewSet(ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin, viewsets.GenericViewSet):  
    queryset = Note.objects.all()  
    serializer_class = NoteSerializer  
    permission_classes = [IsAuthenticated]  
    authentication_classes = [JWTAuthentication]  

    def get_queryset(self):  
        return self.queryset.filter(user=self.request.user)  

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response({"message": "Note and audio files created successfully", "note": serializer.data}, status=status.HTTP_201_CREATED, headers=headers)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)  # allows for partial updates
        instance = self.get_object()  # retrieves the object to be updated
        serializer = self.get_serializer(instance, data=request.data, partial=partial)  # initializes the serializer with existing instance and new data  

        if serializer.is_valid():
            self.perform_update(serializer)
            return Response({"message": "Note and audio files updated successfully", "note": serializer.data}, status=status.HTTP_200_OK)  

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, *args, **kwargs):  
        instance = self.get_object()  
        serializer = self.get_serializer(instance)  

        # Get the related audio files  
        audio_files = instance.audio_files.values('id', 'name', 'uploaded_at')  # Get a queryset of related audio files  
        note_data = serializer.data  

        # Add audio files to the note data  
        note_data['audio_files'] = audio_files

        return Response(note_data)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user) 

    def perform_update(self, serializer):
        print(self.request.user)
        super().perform_update(serializer)
        
        # # Handle audio file uploads from the update request (if needed)  
        # audio_files = self.request.FILES.getlist('audio_files')  # Fetch audio files if provided
        # print(audio_files)
        # for audio_file in audio_files:  
        #     audio = Audio(note=note, audio_file=audio_file)  # Create an Audio instance  
        #     audio.save()  # Save the Audio instance to the database

    def destroy(self, request, *args, **kwargs):  
        note = self.get_object()  # Get the note to delete  
        note.delete()  # Delete the note and its related audio files can be handled by the cascading deletion  
        return Response(status=status.HTTP_204_NO_CONTENT)