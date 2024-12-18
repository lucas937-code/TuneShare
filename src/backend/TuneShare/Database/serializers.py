from rest_framework import serializers
from .models import Playlist, User, Track, IncludesTrack, FollowsUser, FollowsPlaylist


from rest_framework import serializers
from .models import Playlist, IncludesTrack

class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
        fields = '__all__'

    def get_spotify_id(self, obj):
        try:
            follow = FollowsPlaylist.objects.get(playlist_id=obj.id, is_owner=True)
            return follow.spotify_id
        except FollowsPlaylist.DoesNotExist:
            return None

    def get_apple_music_id(self, obj):
        try:
            follow = FollowsPlaylist.objects.get(playlist_id=obj.id, is_owner=True)
            return follow.apple_music_id
        except FollowsPlaylist.DoesNotExist:
            return None

    def get_track_list(self, obj):
        # Fetch and order track IDs based on the 'position' field
        track_ids = IncludesTrack.objects.filter(playlist=obj).order_by('position').values_list('track_id', flat=True)
        return list(track_ids)



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = '__all__'


class IncludesSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncludesTrack
        fields = '__all__'


class FollowsUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowsUser
        fields = '__all__'


class FollowsPlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowsPlaylist
        fields = '__all__'
