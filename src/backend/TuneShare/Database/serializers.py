from rest_framework import serializers, viewsets
from .models import Playlist, User, Track, IncludesTrack, Follows


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


class FollowsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follows
        fields = '__all__'
