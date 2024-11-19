from django.urls import path
from . import views
from rest_framework_simplejwt import views as jwt_views
  
urlpatterns = [
    path('logout/', views.LogoutView.as_view(), name ='logout'),
]