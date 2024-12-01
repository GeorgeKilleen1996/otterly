from rest_framework import routers
from django.urls import path
from . import views

router = routers.SimpleRouter()

router.register(r'users', views.UserViewSet, basename='user')

urlpatterns = [
    path('auth/token/', views.AuthTokenView.as_view(), name='auth-token'),
    path('admin-frontend/', views.AdminLoginView.as_view()),
]