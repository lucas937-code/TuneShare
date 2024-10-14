from django.urls import path

from .views import register_user, login_user, refresh_session, username_available

urlpatterns = [
    path('register/', register_user, name='registration'),
    path('login/', login_user, name='login'),
    path('refresh/', refresh_session, name='refresh'),
    path('username_available/', username_available, name='username_available')
]
