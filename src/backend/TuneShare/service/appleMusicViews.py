from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
import requests
import jwt
from django.conf import settings
import datetime
from Database.models import User



class AppleMusicView(APIView):
    def get(self, request, *args, **kwargs):
        action = request.query_params.get('action')

        if action == 'login':
            return self.apple_music_login(request)

        elif action == 'callback':
            return self.callback(request)

        elif action == 'playlists':
            return self.apple_music_playlists(request)

        elif action == 'get_playlist':
            return self.apple_music_get_playlist(request)

        elif action == 'get_current_user':
            return self.apple_music_get_current_user(request)

        return Response({'error': 'Invalid action'}, status=400)

    def generate_apple_music_token(self):
        private_key = settings.APPLE_MUSIC_PRIVATE_KEY
        team_id = settings.APPLE_MUSIC_TEAM_ID
        key_id = settings.APPLE_MUSIC_KEY_ID

        headers = {
            'alg': 'ES256',
            'kid': key_id
        }

        payload = {
            'iss': team_id,
            'iat': datetime.datetime.now(datetime.UTC),
            'exp': datetime.datetime.now(datetime.UTC) + datetime.timedelta(hours=1),
        }

        token = jwt.encode(payload, private_key, algorithm='ES256', headers=headers)
        return token

    def apple_music_login(self, request):
        developer_token = self.generate_apple_music_token()
        return JsonResponse({'developer_token': developer_token})

    def callback(self, request):
        music_user_token = request.headers['music-user-token']

        if music_user_token:
            token_obj, created = User.objects.get_or_create(user_uuid=request.user.id)

            token_obj.apple_music_access_token = music_user_token
            token_obj.save()

            return Response(status=200)
        return Response({'error': 'Music-User-Token is required'}, status=400)

    def apple_music_playlists(self, request):
        music_user_token = User.objects.get(user_uuid=request.user.id).apple_music_access_token
        if not music_user_token:
            return JsonResponse({'error': 'Music-User-Token is required'}, status=400)

        developer_token = self.generate_apple_music_token()

        url = "https://api.music.apple.com/v1/me/library/playlists"
        headers = {
            'Authorization': f'Bearer {developer_token}',
            'Music-User-Token': music_user_token
        }

        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            return Response({'error': 'Failed to fetch playlists'}, status=response.status_code)

        return Response(response.json(), status=200)

    def apple_music_get_playlist(self, request):
        music_user_token = User.objects.get(user_uuid=request.user.id).apple_music_access_token
        playlist_id = request.headers.get('playlist-id')
        if not music_user_token or not playlist_id:
            return JsonResponse({'error': 'Music-User-Token and playlist-id are required'}, status=400)

        developer_token = self.generate_apple_music_token()

        url = f"https://api.music.apple.com/v1/me/library/playlists/{playlist_id}"
        headers = {
            'Authorization': f'Bearer {developer_token}',
            'Music-User-Token': music_user_token
        }

        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            return Response({'error': 'Failed to fetch playlist'}, status=response.status_code)

        return Response(response.json(), status=200)

    def apple_music_get_current_user(self, request):
        music_user_token = User.objects.get(user_uuid=request.user.id).apple_music_access_token
        if not music_user_token:
            return JsonResponse({'error': 'Music-User-Token is required'}, status=400)

        developer_token = self.generate_apple_music_token()

        url = "https://api.music.apple.com/v1/me"
        headers = {
            'Authorization': f'Bearer {developer_token}',
            'Music-User-Token': music_user_token
        }

        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            return Response({'error': 'Failed to fetch user'}, status=response.status_code)

        return Response(response.json(), status=200)