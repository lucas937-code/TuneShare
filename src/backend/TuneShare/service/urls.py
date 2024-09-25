from django.urls import path, include

from service.views import SpotifyView

urlpatterns = [
    path('spotify/', SpotifyView.as_view(), name='spotify'),
]
