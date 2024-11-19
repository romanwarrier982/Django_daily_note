from rest_framework import generics  
from rest_framework.response import Response  
from rest_framework import status  
from .serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError

class SignupView(generics.CreateAPIView):  
    serializer_class = UserSerializer  

    def post(self, request):  
        serializer = self.get_serializer(data=request.data)
        try:  
            serializer.is_valid(raise_exception=True)  # This will raise an error if data is invalid
            email = serializer.validated_data.get('email')  
            if User.objects.filter(email=email).exists():  
                return Response({'error': 'A user with that email already exists.'}, status=status.HTTP_400_BAD_REQUEST)
            user = serializer.save()  
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        except ValidationError as e:  
            return Response({'error': e.detail}, status=status.HTTP_400_BAD_REQUEST)  # Return specific validation errors  
        except Exception as e:  
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)  # Catch other exceptions