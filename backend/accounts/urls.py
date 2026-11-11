from django.urls import path
from accounts.views import CustomRefreshView, LogoutView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from accounts.views import CurrentUserView, CustomLoginView, RegisterView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path('login/', CustomLoginView.as_view(), name='login'),
    path("refresh/", CustomRefreshView.as_view(), name="token_refresh"),
    path('me/', CurrentUserView.as_view(), name='current_user'),
    path("logout/", LogoutView.as_view(), name="logout"),
]
