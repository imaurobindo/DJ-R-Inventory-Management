from rest_framework import serializers
from .models import Product, Seller, Warehouse,WarehouseAddress, Category, SubCategory, SubSubCategory, SellerAddress, MyUser
from django.db import models
from django.contrib.auth.models import User

class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('__all__')


class SellersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller
        fields = ('__all__')


class SellerMobileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller
        fields = ('seller_mobile', 'seller_otp', 'otp_verified')

class WarehousesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Warehouse
        fields = ('__all__')

class WarehouseAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = WarehouseAddress
        fields = ('__all__')


class AuthUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'email', 'password', 'is_active', 'is_staff')

class AuthUserPutSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'is_staff')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('__all__')

class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = ('__all__')

class SubSubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubSubCategory
        fields = ('__all__')


class SellerAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellerAddress
        fields = ('__all__')


class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ('username', 'email', 'password', 'is_live', 'first_name')