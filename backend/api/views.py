from django.shortcuts import render, redirect
from rest_framework import generics, status
from django.contrib.auth.models import User
from .models import Product, Warehouse,WarehouseAddress, Seller, Category, SubCategory, SubSubCategory, SellerAddress, MyUser
from .serializers import ProductsSerializer, AuthUserSerializer, WarehouseAddressSerializer, AuthUserPutSerializer, SellersSerializer, WarehousesSerializer, CategorySerializer, SubCategorySerializer, SubSubCategorySerializer, SellerAddressSerializer, MyUserSerializer, SellerMobileSerializer
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView



# Create your views here.

class ProductsView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductsSerializer
    permission_classes = [AllowAny]

   

class AuthUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = AuthUserSerializer
    permission_classes = [AllowAny]
    def create(self, request, *args, **kwargs):
        data = request.data.copy()

        # Get the password from the request data
        password = data.get('password')

        # Hash the password using PBKDF2
        hashed_password = make_password(password)

        # Replace the plaintext password with the hashed one in the request data
        data['password'] = hashed_password

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    


class AuthUserPutView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = AuthUserPutSerializer
    permission_classes = [AllowAny]
    lookup_field = 'username'
    lookup_url_kwarg = 'username'
    # allowed_methods = ['PATCH']

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
    

# class AuthUserPutView(APIView):
#     permission_classes = [AllowAny]
#     lookup_field = 'username'
#     lookup_url_kwarg = 'username'

#     def get(self, request, username):
#         user = User.objects.get(username=username)
#         serializer = AuthUserPutSerializer(user)
#         return render(request, 'user_form.html', {'serializer': serializer})

#     def patch(self, request, username):
#         user = User.objects.get(username=username)
#         serializer = AuthUserPutSerializer(user, data=request.data, partial=True)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(serializer.data)


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


class WarehouseAddressView(generics.ListCreateAPIView):
    queryset = WarehouseAddress.objects.all()
    serializer_class = WarehouseAddressSerializer
    permission_classes = [AllowAny]



@api_view(['GET','PATCH','POST'])
@permission_classes([IsAuthenticated])
def current_user(request):
    serializer = AuthUserSerializer(request.user)
    return Response(serializer.data)


class MyUserView(generics.CreateAPIView):
    queryset = MyUser.objects.all()
    serializer_class = MyUserSerializer
    permission_classes = [AllowAny]

class SellerMobileView(generics.CreateAPIView):
    queryset = Seller.objects.all()
    serializer_class = SellerMobileSerializer
    permission_classes = [AllowAny]