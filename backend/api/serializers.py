from rest_framework import serializers
from .models import Product
from django.db import models
from django.contrib.auth.models import User

class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('__all__')


class AuthUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
