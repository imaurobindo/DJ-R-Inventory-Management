from rest_framework import serializers
from .models import Product, Seller, Warehouse, Category, SubCategory, SubSubCategory, SellerAddress
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


class WarehousesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Warehouse
        fields = ('__all__')


class AuthUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')


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