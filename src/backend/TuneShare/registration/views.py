from Database.models import User
from django.http import JsonResponse, HttpResponse
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import RegistrationSerializer
from .supabase import get_supabase_client

REFRESH_TOKEN_COOKIE_NAME = 'refresh_token'


@api_view(['POST'])
def register_user(request):
    serializer = RegistrationSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    email = serializer.validated_data['email']
    password = serializer.validated_data['password']
    username = serializer.validated_data['username']
    display_name = serializer.validated_data['display_name']

    supabase = get_supabase_client()
    try:
        response = supabase.auth.sign_up({'email': email, 'password': password})
        supabase.table('Database_user').insert({
            'username': username if username else response.user.id,
            'display_name': display_name,
            'user_uuid': response.user.id,
        }).execute()
        data = {
            'user': {
                'id': response.user.id,
                'email': response.user.email,
                'username': username,
                'display_name': display_name
            },
            'session': {
                'access_token': response.session.access_token,
                'refresh_token': response.session.refresh_token,
                'expires_in': response.session.expires_in,
                'expires_at': response.session.expires_at
            },
            'messageEn': 'Registration successful. Check your email to verify your account.',
            'messageDe': 'Registrierung erfolgreich. Klicke auf den Link in der E-Mail, um deinen account zu '
                         'verifizieren.'
        }

        res = Response(data, status=status.HTTP_200_OK)
        return res
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    supabase = get_supabase_client()
    try:
        response = supabase.auth.sign_in_with_password({'email': email, 'password': password})
        data = {
            'user': {
                'id': response.user.id,
                'email': response.user.email
            },
            'session': {
                'access_token': response.session.access_token,
                'refresh_token': response.session.refresh_token,
                'expires_in': response.session.expires_in,
                'expires_at': response.session.expires_at
            },
            'messageEn': 'Login successful',
            'messageDe': 'Login erfolgreich',
        }

        res = JsonResponse(data, status=status.HTTP_200_OK)
        res.set_cookie(
            key=REFRESH_TOKEN_COOKIE_NAME,
            value=response.session.refresh_token,
            httponly=True,
            secure=False,
            samesite='Lax',
            max_age=2592000
        )
        return res

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def refresh_session(request):
    refresh_token = request.COOKIES.get('refresh_token')
    if not refresh_token:
        return Response({'error': 'Refresh token is missing'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        response = get_supabase_client().auth.refresh_session(refresh_token)
        response = HttpResponse({
            'access_token': response.session.access_token,
            'refresh_token': response.session.refresh_token,
            'expires_in': response.session.expires_in,
            'expires_at': response.session.expires_at
        }, status=status.HTTP_200_OK).set_cookie(
            key=REFRESH_TOKEN_COOKIE_NAME,
            value=response.session.refresh_token,
            httponly=True,
            secure=False,
            samesite='Lax',
            max_age=2_592_000
        )
        return response
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def username_available(request):
    username_to_check = request.query_params.get('username')
    try:
        User.objects.get(username=username_to_check)
        return Response(False, status=status.HTTP_200_OK)
    except ObjectDoesNotExist:
        return Response({'is_available': True}, status=status.HTTP_200_OK)


@api_view(['GET'])
def email_available(request):
    username_to_check = request.query_params.get('username')
    try:
        User.objects.get(username=username_to_check)
        return Response(False, status=status.HTTP_200_OK)
    except ObjectDoesNotExist:
        return Response({'is_available': True}, status=status.HTTP_200_OK)
