from django.contrib import admin  
from rest_framework.routers import DefaultRouter  
from notes.views import NoteViewSet, AudioViewSet
from django.views.generic import TemplateView
from django.urls import path, include, re_path

router = DefaultRouter()  
router.register(r'notes', NoteViewSet)
router.register(r'audio', AudioViewSet)

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
]

urlpatterns += [re_path(r'^.*',
                        TemplateView.as_view(template_name="index.html"))]