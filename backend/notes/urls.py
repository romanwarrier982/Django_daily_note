from django.urls import path, include
from .views import NoteViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', NoteViewSet, basename='books')
  
urlpatterns = [  
    path('', include(router.urls)),
]