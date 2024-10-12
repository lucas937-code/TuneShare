import requests
from Database.models import User, Track
from Database.serializers import PlaylistSerializer, TrackSerializer, IncludesSerializer
from django.conf import settings
from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


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

        elif action == 'add_to_tuneshare':
            return self.add_to_tuneshare(request)

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
        action = request.query_params.get('action')

        if action == 'get_playlist':

            playlist = requests.get(f"https://api.spotify.com/v1/playlists/{request.query_params.get("playlist_id")}",
                                    headers={
                                        "Authorization": f"Bearer {User.objects.get(user_uuid=request.user.id).spotify_access_token}"})

            if playlist.status_code != 200:
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
        action = request.query_params.get('action')

        if action == 'add_to_tuneshare':
            playlist_id = request.query_params.get("playlist_id")
            user = User.objects.get(user_uuid=request.user.id)
            spotify_token = user.spotify_access_token

            response = requests.get(f"https://api.spotify.com/v1/playlists/{playlist_id}",
                                    headers={"Authorization": f"Bearer {spotify_token}"})
            if response.status_code != 200:
                return Response({'error': 'Failed to get playlist from Spotify'}, status=response.status_code)

            playlist_data = response.json()

            cover_url = playlist_data['images'][0]['url'] if playlist_data['images'] else ""
            playlist_payload = {
                'title': playlist_data['name'],
                'cover_url': cover_url,
                'owner_id': user.id,
                'is_public': True
            }

            playlist_serializer = PlaylistSerializer(data=playlist_payload)
            if playlist_serializer.is_valid():
                playlist_instance = playlist_serializer.save()
            else:
                return Response(playlist_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            for track_item in playlist_data['tracks']['items']:
                track_data = track_item['track']
                track_cover_url = track_data['album']['images'][0]['url'] if track_data['album']['images'] else ""
                track_payload = {
                    'spotify_id': track_data['id'],
                    'title': track_data['name'],
                    'artist': track_data['artists'][0]['name'],
                }

                existing_track = Track.objects.filter(spotify_id=track_data['id']).first()
                if existing_track:
                    track_instance = existing_track  # Track existiert bereits
                else:
                    track_serializer = TrackSerializer(data=track_payload)
                    if track_serializer.is_valid():
                        track_instance = track_serializer.save()
                    else:
                        return Response(track_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

                includes_payload = {
                    'playlist': playlist_instance.id,
                    'track': track_instance.id
                }

                includes_serializer = IncludesSerializer(data=includes_payload)
                if includes_serializer.is_valid():
                    includes_serializer.save()
                else:
                    return Response(includes_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response(PlaylistSerializer(playlist_instance).data, status=status.HTTP_201_CREATED)
