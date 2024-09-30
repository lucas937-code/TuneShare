from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import RegistrationSerializer
from .supabase import get_supabase_client


@api_view(['POST'])
def register_user(request):
    serializer = RegistrationSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    email = serializer.validated_data['email']
    password = serializer.validated_data['password']

    supabase = get_supabase_client()
    try:
        response = supabase.auth.sign_up({'email': email, 'password': password})
        return JsonResponse({
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
            'messageEn': 'Registration successful. Check your email to verify your account.',
            'messageDe': 'Registrierung erfolgreich. Klicke auf den Link in der E-Mail, um deinen account zu '
                         'verifizieren.'
        }, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login_user(request):
    email = request.data['email']
    password = request.data['password']
    supabase = get_supabase_client()
    try:
        response = supabase.auth.sign_in_with_password({'email': email, 'password': password})
        return JsonResponse({
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
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
