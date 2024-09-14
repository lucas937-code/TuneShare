from django.conf import settings
from supabase import create_client, Client


def get_supabase_client() -> Client:
    supabase_url: str = settings.SUPABASE_URL
    supabase_key: str = settings.SUPABASE_KEY
    return create_client(supabase_url, supabase_key)
