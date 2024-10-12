from django.urls import path, include

from service.spotifyViews import SpotifyView
from service.appleMusicViews import AppleMusicView

urlpatterns = [
    path('spotify/', SpotifyView.as_view(), name='spotify'),
    path('apple_music/', AppleMusicView.as_view(), name='apple_music')
]
