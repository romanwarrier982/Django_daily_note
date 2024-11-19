from django.contrib import admin  
from rest_framework.routers import DefaultRouter  
from notes.views import NoteViewSet, AudioViewSet
from django.views.generic import TemplateView
from django.urls import path, include, re_path
from rest_framework_simplejwt import views as jwt_views

router = DefaultRouter()  
# router.register(r'notes', NoteViewSet)
# router.register(r'audio', AudioViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('auth.urls')),
    path('token/',
        jwt_views.TokenObtainPairView.as_view(),
        name ='token_obtain_pair'),
    path('token/refresh/',
        jwt_views.TokenRefreshView.as_view(),
        name ='token_refresh')
    # path('auth/', include('djoser.urls')),
    # path('auth/', include('djoser.urls.jwt')),
    # path('auth/', include('djoser.social.urls')),
]

# urlpatterns += [re_path(r'^.*',
#                         TemplateView.as_view(template_name="index.html"))]