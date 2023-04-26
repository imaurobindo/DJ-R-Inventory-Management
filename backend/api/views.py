from django.shortcuts import render, redirect
from rest_framework import generics
from django.contrib.auth.models import User
from .models import Product
from .serializers import ProductsSerializer, AuthUserSerializer
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response


# Create your views here.

class ProductsView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductsSerializer
    permission_classes = [AllowAny]

   

class AuthUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = AuthUserSerializer
    permission_classes = [AllowAny]