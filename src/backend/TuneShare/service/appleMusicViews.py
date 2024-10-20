from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
import requests
import jwt
from django.conf import settings
import datetime
from Database.models import User, Playlist, Track, IncludesTrack


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

        elif action == 'import_to_tuneshare':
            return self.import_to_tuneshare(request)

        elif action == 'export_to_apple_music':
            return self.export_to_apple_music(request)

        elif action == 'remove_link':
            return self.remove_apple_music_link(request)

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
        music_user_token = request.query_params.get('music_user_token')

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

        url = "https://api.music.apple.com/v1/me/library/playlists?limit=100"
        headers = {
            'Authorization': f'Bearer {developer_token}',
            'Music-User-Token': music_user_token
        }

        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            return Response({'error': 'Failed to fetch playlists'}, status=response.status_code)

        apple_music_playlists = response.json()['data']
        frontend_playlists = []

        for playlist in apple_music_playlists:
            cover_url = "https://img.fotocommunity.com/papagei-frisst-loewenzahn-5b0326d5-65d2-4914-a1b6-1751830ed208.jpg?height=1080"
            if 'artwork' in playlist['attributes'].keys():
                cover_url = playlist['attributes']['artwork']['url'].replace("{w}x{h}", "500x500")

            description = ''
            if 'description' in playlist['attributes'].keys():
                description = playlist['attributes']['description']['standard']

            if 'name' in  playlist['attributes'].keys():
                frontend_playlists.append({
                    "apple_music_id": playlist['id'],
                    "title": playlist['attributes']['name'],
                    "description": description,
                    "cover_url": cover_url
                })

        return Response(frontend_playlists, status=200)

    def apple_music_get_playlist(self, request):
        music_user_token = User.objects.get(user_uuid=request.user.id).apple_music_access_token
        playlist_id = request.query_params.get('id')
        if not music_user_token or not playlist_id:
            return JsonResponse({'error': 'Music-User-Token and playlist-id are required'}, status=400)

        developer_token = self.generate_apple_music_token()

        url = f"https://api.music.apple.com/v1/me/library/playlists/{playlist_id}?include=tracks"
        headers = {
            'Authorization': f'Bearer {developer_token}',
            'Music-User-Token': music_user_token
        }

        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            return Response({'error': 'Failed to fetch playlist'}, status=response.status_code)

        playlist = response.json()['data'][0]

        description = ''
        if 'description' in playlist['attributes'].keys():
            description = playlist['attributes']['description']['standard']

        tracks = []
        for track in playlist['relationships']['tracks']['data']:
            cover_url = "https://img.fotocommunity.com/papagei-frisst-loewenzahn-5b0326d5-65d2-4914-a1b6-1751830ed208.jpg?height=1080"
            if 'artwork' in track['attributes'].keys():
                cover_url = track['attributes']['artwork']['url'].replace("{w}x{h}", "500x500")
            catalog_id = track['id']
            if 'catalogId' in track['attributes']['playParams']:
                catalog_id = track['attributes']['playParams']['catalogId']
            tracks.append({
                'apple_music_id': catalog_id,
                'title': track['attributes']['name'],
                'artist': track['attributes']['artistName'],
                'cover_url': cover_url
            })
        cover_url = "https://img.fotocommunity.com/papagei-frisst-loewenzahn-5b0326d5-65d2-4914-a1b6-1751830ed208.jpg?height=1080"
        if 'artwork' in playlist['attributes'].keys():
            cover_url = playlist['attributes']['artwork']['url'].replace("{w}x{h}", "500x500")
        frontend_playlist = {
            "apple_music_id": playlist['id'],
            "title": playlist['attributes']['name'],
            "description": description,
            "cover_url": cover_url,
            "track_list": tracks
        }

        return Response(frontend_playlist, status=200)

    def apple_music_get_current_user(self, request):
        action = request.query_params.get('action')

        if action == 'get_current_user':
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

    def import_to_tuneshare(self, request):
        music_user_token = User.objects.get(user_uuid=request.user.id).apple_music_access_token
        if not music_user_token:
            return JsonResponse({'error': 'Music-User-Token is required'}, status=400)

        playlist = self.apple_music_get_playlist(request).data

        playlist_owner = User.objects.get(user_uuid=request.user.id)
        playlist_object, created = Playlist.objects.get_or_create(owner_id=playlist_owner,
                                                                  origin_id=playlist['apple_music_id'])

        playlist_object.title = playlist['title']
        playlist_object.cover_url = playlist['cover_url']
        playlist_object.is_public = True

        playlist_object.save()

        included_tracks = IncludesTrack.objects.filter(playlist_id=playlist_object)
        included_tracks.delete()

        for index, track in enumerate(playlist['track_list']):
            track_object, created = Track.objects.get_or_create(title=track['title'], artist=track['artist'])
            track_object.apple_music_id = track['apple_music_id']
            if created:
                track_object.cover_url = track['cover_url']

            track_object.save()

            included = IncludesTrack.objects.create(position=index + 1, playlist=playlist_object, track=track_object)
            included.save()

        return Response({}, status=200)

    def export_to_apple_music(self, request):
        music_user_token = User.objects.get(user_uuid=request.user.id).apple_music_access_token
        if not music_user_token:
            return JsonResponse({'error': 'Music-User-Token is required'}, status=400)

        developer_token = self.generate_apple_music_token()

        playlist = Playlist.objects.get(id=request.query_params.get('playlist_id'))
        included_tracks = IncludesTrack.objects.filter(playlist=playlist).order_by('position')
        track_list = []

        for track_included in included_tracks:
            if track_included.track.apple_music_id:
                track_list.append({
                    "id": track_included.track.apple_music_id,
                    "type": "songs"
                })
            else:
                url = f"https://api.music.apple.com/v1/catalog/de/search?term={track_included.track.artist} {track_included.track.title}&types=songs&limit=1"
                headers = {
                    'Authorization': f'Bearer {developer_token}',
                    'Music-User-Token': music_user_token
                }
                response = requests.get(url, headers=headers)

                if 'errors' not in response.json().keys():
                    track = Track.objects.get(id=track_included.track.id)
                    track.apple_music_id = response.json()['results']['songs']['data'][0]['id']

                    track.save()
                    track_list.append({
                        "id": track.apple_music_id,
                        "type": "songs"
                    })

        request_body = {
            "attributes": {
                "name": playlist.title,
                "description": ""
            },
            "relationships": {
                "tracks": {
                    "data": track_list
                }
            }
        }

        url = "https://api.music.apple.com/v1/me/library/playlists"
        headers = {
            'Authorization': f'Bearer {developer_token}',
            'Music-User-Token': music_user_token,
            'Content-Type': 'application/json'
        }

        response = requests.post(url, headers=headers, json=request_body)

        if response.status_code == 200:
            return Response(response.json(), status=200)
        else:
            return Response(response.json(), status=response.status_code)

    def remove_apple_music_link(self, request):
        user = User.objects.get(user_uuid=request.user.id)
        user.apple_music_access_token = None
        user.save()

        return Response(status=status.HTTP_204_NO_CONTENT)