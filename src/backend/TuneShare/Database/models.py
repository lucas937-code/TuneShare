from django.core.validators import RegexValidator
from django.db import models

class Playlist(models.Model):
    id = models.AutoField(primary_key=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    title = models.CharField(max_length=100)
    cover_url = models.URLField(max_length=500)
    is_public = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class Track(models.Model):
    id = models.AutoField(primary_key=True)
    spotify_id = models.CharField(null=True)
    apple_music_id = models.CharField(null=True)
    title = models.CharField()

    date_created = models.DateTimeField(auto_now_add=True)
    artist = models.CharField()


class IncludesTrack(models.Model):
    # to access a playlists songs -> playlist.tracks.all()
    position = models.IntegerField()
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE)
    track = models.ForeignKey(Track, on_delete=models.CASCADE, related_name='tracks')



class User(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(
        max_length=30,
        unique=True,
        validators=[
            RegexValidator(
                regex=r'^[a-zA-Z0-9_.]*$',
                code='invalid_username'
            ),
        ]
    )
    display_name = models.CharField()
    email = models.EmailField()
    password = models.CharField()
    spotify_user_id = models.CharField(null=True)
    apple_music_user_id = models.CharField(null=True)
    date_created = models.DateTimeField(auto_now_add=True)

    spotify_access_token = models.CharField(null=True)
    spotify_refresh_token = models.CharField(null=True)

    apple_music_access_token = models.CharField(null=True)
    apple_music_refresh_token = models.CharField(null=True)


class FollowsUser(models.Model):
    # to access a user's followers -> user.followers_user.all()
    # to access the users a user is following -> user.following_user.all()
    follower_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='following_user')
    followed_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followers_user')


class FollowsPlaylist(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='following_playlist')
    playlist_id = models.ForeignKey(Playlist, on_delete=models.CASCADE, related_name='following_playlist')
    is_owner = models.BooleanField(default=False)

    spotify_id = models.CharField(null=True)
    apple_music_id = models.CharField(null=True)
