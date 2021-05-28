from rest_framework import fields, serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

# User Serial
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name')

# Register Serial

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'password')
    
    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],
        validated_data['email'], validated_data['password'])

        return user


# Login Serial