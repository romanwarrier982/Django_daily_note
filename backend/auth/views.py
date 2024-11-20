from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer, SignUpSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny

# Create your views here.
class CustomObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = CustomTokenObtainPairSerializer

class SignUpView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = SignUpSerializer