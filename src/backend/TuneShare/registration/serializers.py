from rest_framework import serializers


class RegistrationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(allow_null=False, min_length=8)
    username = serializers.CharField(allow_null=True, min_length=3)
    display_name = serializers.CharField(allow_null=True, min_length=3)
