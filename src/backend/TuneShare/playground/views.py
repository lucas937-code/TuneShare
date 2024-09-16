from django.conf import settings
from supabase import create_client, Client

supabase_url = settings.SUPABASE_URL
supabase_key = settings.SUPABASE_KEY
supabase_client: Client = create_client(supabase_url, supabase_key)

print(supabase_url, supabase_key)
