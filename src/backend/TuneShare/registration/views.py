from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import RegistrationSerializer
from .supabase import get_supabase_client


class RegisterView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            supabase = get_supabase_client()
            try:
                response = supabase.auth.sign_up({'email': email, 'password': password})
                return JsonResponse({
                    'messageEn': 'Registration successful. Check your email to verify your account.',
                    'messageDe': 'Registrierung erfolgreich. Klicke auf den Link in der E-Mail, um deinen account zu '
                                 'verifizieren.',
                    'email': response.user.email
                }, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
