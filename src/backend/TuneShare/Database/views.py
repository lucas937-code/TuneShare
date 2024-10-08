from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import Playlist, User, Track, IncludesTrack, FollowsUser, FollowsPlaylist
from .serializers import PlaylistSerializer, TrackSerializer, UserSerializer, IncludesSerializer, FollowsUserSerializer, \
    FollowsPlaylistSerializer


def create(view_set, request, *args, **kwargs):
    serializer = view_set.get_serializer(data=request.data)
    if serializer.is_valid():
        view_set.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def update(view_set, request, *args, **kwargs):
    partial = kwargs.pop('partial', False)
    instance = view_set.get_object()
    serializer = view_set.get_serializer(instance, data=request.data, partial=partial)
    if serializer.is_valid():
        view_set.perform_update(serializer)
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def destroy(view_set, request, *args, **kwargs):
    instance = view_set.get_object()
    view_set.perform_destroy(instance)
    return Response(status=status.HTTP_204_NO_CONTENT)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        return create(self, request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        return update(self, request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return destroy(self, request, *args, **kwargs)


class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer

    def create(self, request, *args, **kwargs):
        return create(self, request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        return update(self, request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return destroy(self, request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        playlists = self.get_queryset()  # Default queryset, can be customized
        serializer = self.get_serializer(playlists, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        playlist = self.get_object()
        serializer = self.get_serializer(playlist)
        return Response(serializer.data, status=status.HTTP_200_OK)


class TrackViewSet(viewsets.ModelViewSet):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer

    def create(self, request, *args, **kwargs):
        return create(self, request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        return update(self, request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return destroy(self, request, *args, **kwargs)


class IncludesViewSet(viewsets.ModelViewSet):
    queryset = IncludesTrack.objects.all()
    serializer_class = IncludesSerializer

    def create(self, request, *args, **kwargs):
        return create(self, request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        return update(self, request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return destroy(self, request, *args, **kwargs)


class FollowsViewSet(viewsets.ModelViewSet):
    queryset = FollowsUser.objects.all()
    serializer_class = FollowsUserSerializer

    def create(self, request, *args, **kwargs):
        return create(self, request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        return update(self, request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return destroy(self, request, *args, **kwargs)


class FollowsPlaylistViewSet(viewsets.ModelViewSet):
    queryset = FollowsPlaylist.objects.all()
    serializer_class = FollowsPlaylistSerializer

    def create(self, request, *args, **kwargs):
        return create(self, request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        return update(self, request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return destroy(self, request, *args, **kwargs)
