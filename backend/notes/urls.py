from django.urls import path, include
from .views import NoteListViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', NoteListViewSet, basename='books')
  
urlpatterns = [  
    path('', include(router.urls)),  
    # path('create/', NoteCreateView.as_view(), name='note-create'),  
    # path('<int:pk>/', NoteDetailView.as_view(), name='note-detail'),  
    # path('<int:pk>/update/', NoteUpdateView.as_view(), name='note-update'),  
    # path('<int:pk>/delete/', NoteDeleteView.as_view(), name='note-delete'), 
]