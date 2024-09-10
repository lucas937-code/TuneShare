from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from Database.views import PlaylistViewSet, TrackViewSet, IncludesViewSet, FollowsViewSet, UserViewSet

router = DefaultRouter()
router.register(r'playlist', PlaylistViewSet)
router.register(r'track', TrackViewSet)
router.register(r'includes', IncludesViewSet)
router.register(r'follows', FollowsViewSet)
router.register(r'user', UserViewSet)

# Main URL configuration
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
