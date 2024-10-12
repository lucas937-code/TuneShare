from django.contrib import admin
from django.urls import path, include

# Main URL configuration
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('Database.urls')),
    path('auth/', include('registration.urls')),
    path('service/', include('service.urls'))
]
