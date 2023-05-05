from django.shortcuts import render, redirect
from rest_framework import generics
from django.contrib.auth.models import User
from .models import Product, Warehouse, Seller, Category, SubCategory, SubSubCategory, SellerAddress, MyUser
from .serializers import ProductsSerializer, AuthUserSerializer, SellersSerializer, WarehousesSerializer, CategorySerializer, SubCategorySerializer, SubSubCategorySerializer, SellerAddressSerializer, MyUserSerializer
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes


# Create your views here.

class ProductsView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductsSerializer
    permission_classes = [AllowAny]

   

class AuthUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = AuthUserSerializer
    permission_classes = [AllowAny]


class SellersView(generics.ListCreateAPIView):
    queryset = Seller.objects.all()
    serializer_class = SellersSerializer
    permission_classes = [AllowAny]



class WarehousesView(generics.ListCreateAPIView):
    queryset = Warehouse.objects.all()
    serializer_class = WarehousesSerializer
    permission_classes = [AllowAny]


class CategoryView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

class SubCategoryView(generics.ListCreateAPIView):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer
    permission_classes = [AllowAny]

class SubSubCategoryView(generics.ListCreateAPIView):
    queryset = SubSubCategory.objects.all()
    serializer_class = SubSubCategorySerializer
    permission_classes = [AllowAny]


class SellerAddressView(generics.ListCreateAPIView):
    queryset = SellerAddress.objects.all()
    serializer_class = SellerAddressSerializer
    permission_classes = [AllowAny]



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    serializer = AuthUserSerializer(request.user)
    return Response(serializer.data)


class MyUserView(generics.CreateAPIView):
    queryset = MyUser.objects.all()
    serializer_class = MyUserSerializer
    permission_classes = [AllowAny]