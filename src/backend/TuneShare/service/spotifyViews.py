import base64

import requests
from Database.models import User, Track, Playlist, IncludesTrack
from django.conf import settings
from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class SpotifyView(APIView):

    def get(self, request, *args, **kwargs):
        action = request.query_params.get('action')

        match action:
            case 'login':
                return self.spotify_login(request)
            case 'callback':
                return self.spotify_callback(request)
            case 'playlists':
                return self.spotify_playlists(request)
            case 'get_playlist':
                return self.get_playlist(request)
            case 'get_current_user':
                return self.get_current_user(request)
            case 'add_to_tuneshare':
                return self.add_to_tuneshare(request)
            case _:
                return Response({'error': 'Invalid action'}, status=400)

    def refresh_access_token(self, request):
        user = User.objects.get(user_uuid=request.user.id)
        refresh_token = user.spotify_refresh_token

        client_creds = f"{settings.SPOTIFY_CLIENT_ID}:{settings.SPOTIFY_CLIENT_SECRET}"
        client_creds_b64 = base64.b64encode(client_creds.encode())

        headers = {
            'Authorization': f"Basic {client_creds_b64.decode()}",
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        data = {
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token,
        }

        response = requests.post('https://accounts.spotify.com/api/token', headers=headers, data=data)

        if response.status_code != 200:
            return Response({'error': 'Failed to refresh token'}, status=response.status_code)

        access_token = response.json().get('access_token')

        if access_token:
            user.spotify_access_token = access_token
            user.save()
            return Response({"message": "Token refreshed successfully"}, status=200)
        else:
            return Response({'error': 'Access token missing in the response'}, status=500)

    def spotify_login(self, request):
        client_id = settings.SPOTIFY_CLIENT_ID
        redirect_uri = settings.SPOTIFY_REDIRECT_URI
        scope = "ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-modify user-follow-read user-read-playback-position user-top-read user-read-recently-played user-library-modify user-library-read user-read-email user-read-private"
        auth_url = (
            'https://accounts.spotify.com/authorize'
            f'?response_type=code&client_id={client_id}&scope={scope}&redirect_uri={redirect_uri}'
        )
        return JsonResponse({'auth_url': auth_url})

    def spotify_callback(self, request):
        code = request.query_params.get('code')

        if not code:
            return Response({'error': 'No authorization code provided'}, status=400)

        # Exchange authorization code for an access token
        token_url = 'https://accounts.spotify.com/api/token'
        redirect_uri = settings.SPOTIFY_REDIRECT_URI
        client_id = settings.SPOTIFY_CLIENT_ID
        client_secret = settings.SPOTIFY_CLIENT_SECRET

        response = requests.post(token_url, data={
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': redirect_uri,
            'client_id': client_id,
            'client_secret': client_secret,
        })

        if response.status_code != 200:
            return Response({'error': 'Failed to fetch token'}, status=response.status_code)

        response_data = response.json()
        access_token = response_data.get('access_token')
        refresh_token = response_data.get('refresh_token')

        token_obj, created = User.objects.get_or_create(user_uuid=request.user.id)

        token_obj.spotify_access_token = access_token
        token_obj.spotify_refresh_token = refresh_token
        token_obj.save()

        return Response("", status=200)

    def get_current_user(self, request):
        spotify_user = requests.get("https://api.spotify.com/v1/me", headers={
            'Authorization': f'Bearer {User.objects.get(user_uuid=request.user.id).spotify_access_token}'})


        if spotify_user.status_code != 200:
            self.refresh_access_token(request)
            spotify_user = requests.get("https://api.spotify.com/v1/me", headers={
                'Authorization': f'Bearer {User.objects.get(user_uuid=request.user.id).spotify_access_token}'})

            if spotify_user.status_code != 200:
                return Response({'error': 'Failed to get profile'}, status=spotify_user.status_code)

        return Response(spotify_user.json(), status=200)

    def spotify_playlists(self, request):
        playlists = requests.get(
            f"https://api.spotify.com/v1/users/{request.query_params.get("user_id")}/playlists",
            headers={
                "Authorization": f"Bearer {User.objects.get(user_uuid=request.user.id).spotify_access_token}"})

        if playlists.status_code != 200:
            self.refresh_access_token(request)
            playlists = requests.get(
                f"https://api.spotify.com/v1/users/{request.query_params.get("user_id")}/playlists",
                headers={
                    "Authorization": f"Bearer {User.objects.get(user_uuid=request.user.id).spotify_access_token}"})
            if playlists.status_code != 200:
                return Response({'error': 'Failed to get playlists'}, status=playlists.status_code)

        playlists = playlists.json()
        frontend_playlists = []

        for playlist in playlists['items']:
            cover_url = playlist['images'][0]['url'] if playlist['images'] else ""
            frontend_playlists.append({
                'spotify_id': playlist['id'],
                'owner_id': playlist['owner']['id'],
                'title': playlist['name'],
                'description': playlist['description'],
                'cover_url': cover_url
            })

        return Response(frontend_playlists, status=200)

    def get_playlist(self, request):
        playlist = requests.get(f"https://api.spotify.com/v1/playlists/{request.query_params.get("playlist_id")}",
                                headers={
                                    "Authorization": f"Bearer {User.objects.get(user_uuid=request.user.id).spotify_access_token}"})

        if playlist.status_code != 200:
            self.refresh_access_token(request)
            playlist = requests.get(f"https://api.spotify.com/v1/playlists/{request.query_params.get("playlist_id")}",
                                    headers={
                                        "Authorization": f"Bearer {User.objects.get(user_uuid=request.user.id).spotify_access_token}"})
            return Response({'error': 'Failed to get playlist'}, status=playlist.status_code)

        playlist = playlist.json()

        frontend_tracks = []

        for track in playlist['tracks']['items']:
            cover_url = track['track']['album']['images'][0]['url'] if track['track']['album']['images'] else ""

            frontend_tracks.append({
                'spotify_id': track['track']['id'],
                'title': track['track']['name'],
                'artist': track['track']['artists'][0]['name'],
                'cover_url': cover_url
            })

        cover_url = playlist['images'][0]['url'] if playlist['images'] else ""
        frontend_playlist = {
            'spotify_id': playlist['id'],
            'owner_id': playlist['owner']['id'],
            'title': playlist['name'],
            'description': playlist['description'],
            'cover_url': cover_url,
            'track_list': frontend_tracks
        }

        return Response(frontend_playlist, status=200)

    def add_to_tuneshare(self, request):
        user = User.objects.get(user_uuid=request.user.id)

        spotify_playlist = self.get_playlist(request).data
        playlist_data, already_created = Playlist.objects.get_or_create(owner_id=user,
                                                                        origin_id=spotify_playlist['spotify_id'])

        playlist_data.title = spotify_playlist['title']
        playlist_data.cover_url = spotify_playlist['cover_url']
        playlist_data.is_public = True

        playlist_data.save()

        tracks = IncludesTrack.objects.filter(playlist_id=playlist_data)
        tracks.delete()

        for index, track in enumerate(spotify_playlist['track_list']):
            track_data, already_created = Track.objects.get_or_create(title=track['title'], artist=track['artist'])
            track_data.spotify_id = track['spotify_id']
            track_data.save()

            includes = IncludesTrack.objects.create(position=index + 1, playlist=playlist_data, track=track_data)
            includes.save()

        return Response(status=status.HTTP_201_CREATED)
