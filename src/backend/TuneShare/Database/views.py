from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter
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
    search_fields = ['username', 'display_name']
    filter_backends = (SearchFilter,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        return create(self, request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        return update(self, request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return destroy(self, request, *args, **kwargs)

    @action(detail=False, methods=['get'], url_path='follows')
    def get_followed_users(self, request, *args, **kwargs):
        user = User.objects.get(user_uuid=request.user.id)
        followed_users = FollowsUser.objects.filter(follower_id=user.id) \
            .select_related('followed_id') \
            .values(
            'followed_id_id',
            'followed_id__username',
            'followed_id__display_name'
        )
        response_data = [
            {
                "id": user['followed_id_id'],
                "username": user['followed_id__username'],
                "display_name": user['followed_id__display_name']
            }
            for user in followed_users
        ]
        return Response(response_data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], url_path='current')
    def get_current_user(self, request):
        user = User.objects.get(user_uuid=request.user.id)
        serializer = UserSerializer(user)
        filtered_data = {field: serializer.data[field] for field in ['id', 'username', 'display_name']}

        return Response(filtered_data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'], url_path='playlists')
    def get_playlists_of_user(self, request, pk=None):
        owner = User.objects.get(id=pk)
        playlists = Playlist.objects.filter(owner_id=owner)
        serializer = PlaylistSerializer(playlists, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], url_path='follow_user')
    def follow_user(self, request, *args, **kwargs):
        followed_user = User.objects.get(id=request.query_params.get('id'))
        current_user = User.objects.get(user_uuid=request.user.id)
        follows_object = FollowsUser.objects.create(followed_id=followed_user, follower_id=current_user)
        serializer = FollowsUserSerializer(follows_object)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['delete'], url_path='unfollow_user')
    def unfollow_user(self, request, *args, **kwargs):
        followed_user = User.objects.get(id=request.query_params.get('id'))
        current_user = User.objects.get(user_uuid=request.user.id)
        follows_object = FollowsUser.objects.get(followed_id=followed_user, follower_id=current_user)
        follows_object.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=['post'], url_path='follow_playlist')
    def follow_playlist(self, request, *args, **kwargs):
        followed_playlist = Playlist.objects.get(id=request.query_params.get('id'))
        current_user = User.objects.get(user_uuid=request.user.id)
        follows_object = FollowsPlaylist.objects.create(user_id=current_user, playlist_id=followed_playlist,
                                                        is_owner=False)
        serializer = FollowsPlaylistSerializer(follows_object)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['delete'], url_path='unfollow_playlist')
    def unfollow_playlist(self, request, *args, **kwargs):
        followed_playlist = Playlist.objects.get(id=request.query_params.get('id'))
        current_user = User.objects.get(user_uuid=request.user.id)
        follows_object = FollowsPlaylist.objects.filter(user_id=current_user, playlist_id=followed_playlist)
        follows_object.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=['get'], url_path='followed_playlists')
    def followed_playlists(self, request, *args, **kwargs):
        current_user = User.objects.get(user_uuid=request.user.id)
        followed_playlists = FollowsPlaylist.objects.filter(user_id=current_user)
        playlists = Playlist.objects.filter(id__in=followed_playlists.values('playlist_id'))

        serializer = PlaylistSerializer(playlists, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    @action(detail=False, methods=['get'], url_path="linked_services")
    def spotify_is_linked(self, request, *args, **kwargs):
        current_user = User.objects.get(user_uuid=request.user.id)
        response = {
            'spotify': bool(current_user.spotify_access_token),
            'apple_music': bool(current_user.apple_music_access_token)
        }
        return Response(response, status=status.HTTP_200_OK)


class PlaylistViewSet(viewsets.ModelViewSet):
    search_fields = ['title']
    filter_backends = (SearchFilter,)
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer

    def create(self, request, *args, **kwargs):
        return create(self, request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        return update(self, request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return destroy(self, request, *args, **kwargs)

    @action(detail=True, methods=['get'], url_path='tracks')
    def get_tracks_in_playlist(self, request, pk=None):
        tracks = Track.objects.filter(tracks__playlist_id=pk).order_by('tracks__position')
        serializer = TrackSerializer(tracks, many=True)
        return Response(serializer.data, status.HTTP_200_OK)


class TrackViewSet(viewsets.ModelViewSet):
    search_fields = ['title', 'artist']
    filter_backends = (SearchFilter,)
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
