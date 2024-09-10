from rest_framework import serializers
from .models import Playlist, User, Track, IncludesTrack, FollowsUser, FollowsPlaylist


class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
        fields = '__all__'


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
