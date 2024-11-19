from django.urls import path  
from .views import SignupView  

urlpatterns = [  
    path('api/auth/signup/', SignupView.as_view(), name='signup'),
]  