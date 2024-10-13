from django.urls import path, include
from rest_framework.routers import DefaultRouter

from Database.views import (PlaylistViewSet, TrackViewSet, IncludesViewSet, FollowsViewSet,
                                                  UserViewSet, FollowsPlaylistViewSet)

router = DefaultRouter()
router.register(r'playlist', PlaylistViewSet)
router.register(r'track', TrackViewSet)
router.register(r'includes', IncludesViewSet)
router.register(r'follows_user', FollowsViewSet)
router.register(r'user', UserViewSet)
router.register(r'follows_playlist', FollowsPlaylistViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
