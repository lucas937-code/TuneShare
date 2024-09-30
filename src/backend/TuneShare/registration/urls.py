from django.urls import path

from .views import register_user, login_user

urlpatterns = [
    path('register/', register_user, name='registration'),
    path('login/', login_user, name='login'),
]
