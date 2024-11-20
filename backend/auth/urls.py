from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import CustomObtainTokenPairView, SignUpView

urlpatterns = [
    path("login/", CustomObtainTokenPairView.as_view(), name="token_obtain_pair"),
    path("login/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("signup/", SignUpView.as_view(), name="signup")
]