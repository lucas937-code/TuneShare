from django.conf import settings
from django.http import JsonResponse
from supabase import create_client, Client


def get_supabase_client() -> Client:
    supabase_url: str = settings.SUPABASE_URL
    supabase_key: str = settings.SUPABASE_KEY
    return create_client(supabase_url, supabase_key)


class SupabaseUser:
    def __init__(self, user_data):
        self.id = user_data.id
        self.email = user_data.email
        self.is_active = True


class SupabaseJWTAuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.jwt_secret = settings.SUPABASE_KEY

    def __call__(self, request):
        if request.path in settings.EXEMPT_URLS or request.path.startswith('/admin'):
            return self.get_response(request)

        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return JsonResponse({'error': 'Authorization header missing'}, status=401)

        token = auth_header.split(' ')[1]
        try:
            response = get_supabase_client().auth.get_user(token)
            request.user = SupabaseUser(response.user)
        except Exception as s:
            return JsonResponse({'error': str(s)}, status=401)

        response = self.get_response(request)
        return response
