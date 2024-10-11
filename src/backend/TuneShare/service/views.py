from django.conf import settings
from django.shortcuts import redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponseRedirect, JsonResponse
import requests
from Database.models import User


class SpotifyView(APIView):

    def get(self, request, *args, **kwargs):
        action = request.query_params.get('action')

        if action == 'login':
            return self.spotify_login(request)

        elif action == 'callback':
            return self.spotify_callback(request)

        elif action == 'playlists':
            return self.spotify_playlists(request)

        elif action == 'get_playlist':
            return self.get_playlist(request)

        elif action == 'get_current_user':
            return self.get_current_user(request)

        return Response({'error': 'Invalid action'}, status=400)

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
        action = request.query_params.get('action')
        code = request.query_params.get('code')

        if action == 'callback':
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

        return Response({'error': 'Invalid action'}, status=400)

    def get_current_user(self, request):
        action = request.query_params.get('action')

        if action == 'get_current_user':
            spotify_user = requests.get("https://api.spotify.com/v1/me", headers={
                'Authorization': f'Bearer {User.objects.get(user_uuid=request.user.id).spotify_access_token}'})

            if spotify_user.status_code != 200:
                return Response({'error': 'Failed to get profile'}, status=spotify_user.status_code)

            return Response(spotify_user.json(), status=200)

    def spotify_playlists(self, request):
        action = request.query_params.get('action')

        if action == 'playlists':
            playlists = requests.get(f"https://api.spotify.com/v1/users/{request.headers["spotify-user-id"]}/playlists",
                                     headers={"Authorization": f"Bearer {User.objects.get(user_uuid=request.user.id).spotify_access_token}"})

            if playlists.status_code != 200:
                return Response({'error': 'Failed to get playlists'}, status=playlists.status_code)

            playlists = playlists.json()
            frontend_playlists = []

            for playlist in playlists['items']:
                cover_url = ""
                if len(playlist['images']) >= 1:
                    cover_url = playlist['images'][0]['url']
                frontend_playlists.append({
                    'spotify_id': playlist['id'],
                    'owner_id': playlist['owner']['id'],
                    'title': playlist['name'],
                    'description': playlist['description'],
                    'cover_url': cover_url
                })

            return Response(frontend_playlists, status=200)

    def get_playlist(self, request):
        action = request.query_params.get('action')

        if action == 'get_playlist':

            playlist = requests.get(f"https://api.spotify.com/v1/playlists/{request.headers["playlist-id"]}",
                                     headers={"Authorization": f"Bearer {User.objects.get(user_uuid=request.user.id).spotify_access_token}"})

            if playlist.status_code != 200:
                return Response({'error': 'Failed to get playlist'}, status=playlist.status_code)

            playlist = playlist.json()

            frontend_tracks = []

            for track in playlist['tracks']['items']:
                cover_url = ""
                if len(track['track']['album']['images']) >= 1:
                    cover_url = track['track']['album']['images'][0]['url']

                frontend_tracks.append({
                    'spotify_id': track['track']['id'],
                    'title': track['track']['name'],
                    'artist': track['track']['artists'][0]['name'],
                    'cover_url': cover_url
                })

            cover_url = ""
            if len(playlist['images']) >= 1:
                cover_url = playlist['images'][0]['url']
            frontend_playlist = {
                'spotify_id': playlist['id'],
                'owner_id': playlist['owner']['id'],
                'title': playlist['name'],
                'description': playlist['description'],
                'cover_url': cover_url,
                'track_list': frontend_tracks
            }

            return Response(frontend_playlist, status=200)
