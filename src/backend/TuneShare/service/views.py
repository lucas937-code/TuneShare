from django.conf import settings
from django.shortcuts import redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponseRedirect
import requests
from Database.models import User


class SpotifyView(APIView):

    def get(self, request, *args, **kwargs):
        action = request.query_params.get('action')

        # Handle Spotify login
        if action == 'login':
            return self.spotify_login(request)

        # Handle Spotify callback
        elif action == 'callback':
            return self.spotify_callback(request)

        return Response({'error': 'Invalid action'}, status=400)

    def spotify_login(self, request):
        client_id = settings.SPOTIFY_CLIENT_ID
        redirect_uri = settings.SPOTIFY_REDIRECT_URI
        scope = 'user-read-private user-read-email'
        auth_url = (
            'https://accounts.spotify.com/authorize'
            f'?response_type=code&client_id={client_id}&scope={scope}&redirect_uri={redirect_uri}'
        )
        return HttpResponseRedirect(auth_url)

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

            token_obj, created = User.objects.get_or_create(id=1)
            token_obj.spotify_access_token = access_token
            token_obj.spotify_refresh_token = refresh_token
            token_obj.save()

            frontend_url = settings.FRONTEND_URL
            return redirect(frontend_url)

        return Response({'error': 'Invalid action'}, status=400)
