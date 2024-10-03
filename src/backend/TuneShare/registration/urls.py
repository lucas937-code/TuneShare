from django.urls import path

from .views import register_user, login_user, refresh_session

urlpatterns = [
    path('register/', register_user, name='registration'),
    path('login/', login_user, name='login'),
    path('refresh/', refresh_session, name='refresh'),
]
