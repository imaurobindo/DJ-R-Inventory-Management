from django.db import models
from django.contrib.auth.models import AbstractUser, User, Group
import uuid
#from .manager import UserManager

from django.contrib.auth.models import Permission


# Create your models here.

class IsLive(Permission):
    class Meta:
        proxy = True
        verbose_name = 'Is Live'
        verbose_name_plural = 'Is Live'

class SellerAddress(models.Model):
    pincode = models.CharField(max_length=50)
    postoffice = models.CharField(max_length=150)
    town_or_city = models.CharField(max_length=150)
    district = models.CharField(max_length=150)
    state = models.CharField(max_length=150)
    country = models.CharField(max_length=150)
    street_address = models.CharField(max_length=300, default="")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.area, self.city, self.state
    
    class Meta:
        db_table = "all_seller_addresses"






class Warehouse(models.Model):
    warehouse_name = models.CharField(max_length=50, primary_key=True, default="")
    id = models.CharField(max_length=8, default="")
 
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.warehouse_name
    
    class Meta:
        db_table = "all_warehouses"


class WarehouseAddress(models.Model):
    warehouse_name = models.ForeignKey(Warehouse , on_delete=models.CASCADE, default="")
    pincode = models.CharField(max_length=50)
    postoffice = models.CharField(max_length=150)
    town_or_city = models.CharField(max_length=150)
    district = models.CharField(max_length=150)
    state = models.CharField(max_length=150)
    country = models.CharField(max_length=150)
    street_address = models.CharField(max_length=300, default="")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.area, self.city, self.state
    
    class Meta:
        db_table = "all_warehouse_addresses"


class SellerWarehouseAddress(models.Model):
    s_warehouse_pincode = models.CharField(max_length=50)
    s_warehouse_state = models.CharField(max_length=50)
    s_warehouse_city = models.CharField(max_length=50)
    s_warehouse_address_line1 = models.CharField(max_length=150)
    s_warehouse_address_line2 = models.CharField(max_length=150)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table = "all_seller_warehouse_addresses"


class SellerWarehouse(models.Model):
    s_warehouse_name = models.CharField(max_length=50)
    s_warehouse_address = models.CharField(max_length=150)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table = "all_seller_warehouses"


class Seller(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.OneToOneField(User, on_delete=models.CASCADE, default="")
    seller_mobile = models.CharField(max_length=20, default="")
    seller_otp = models.CharField(max_length=6, default="")
    otp_verified = models.BooleanField(default="False")
    seller_name = models.CharField(max_length=50)
    seller_warehouse = models.ManyToManyField(SellerWarehouse)
    company_warehouse = models.ForeignKey(Warehouse, on_delete=models.CASCADE, default="")
    class Meta:
        db_table = "all_sellers"


class Category(models.Model):
    category_name = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table = "all_categories"
    
    def __str__(self):
        return self.category_name


class SubCategory(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    sub_category_name = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table = "all_sub_categories"
    def __str__(self):
        return self.sub_category_name


class SubSubCategory(models.Model):
    sub_category = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    sub_sub_category_name = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table = "all_sub_sub_categories"
    def __str__(self):
        return self.sub_sub_category_name


class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product_name = models.CharField(max_length=50)
    brand = models.CharField(max_length=30)
    product_price = models.CharField(max_length=30)
    product_category = models.ForeignKey(Category, on_delete=models.CASCADE)
    product_subcategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    product_sub_subcategory = models.ForeignKey(SubSubCategory, on_delete=models.CASCADE, default="")
    product_description = models.TextField(max_length=300, default="")
    product_seller = models.ForeignKey(Seller, on_delete=models.CASCADE, default="")
    product_image = models.ImageField(upload_to="images/product_images", default="")
    ratings = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table = "all_products"


# class User(AbstractUser):
#     phone_number = models.CharField(max_length=13, unique=True)
#     is_phone_verified = models.BooleanField(default=False)
#     otp = models.CharField(max_length=6)
#     is_user_live = models.BooleanField(default=False)

#     USERNAME_FIELD = 'phone_number'
#     REQUIRED_FIELDS = []
#     objects = UserManager()

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.auth.hashers import make_password

class MyUserManager(BaseUserManager):
    def create_user(self, email, username, first_name, is_live, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            first_name=first_name,
            password=make_password(password),
            is_live=is_live,

        )

        user.save(using=self._db)
        return user

class MyUser(AbstractBaseUser):
    email = models.EmailField(verbose_name='email address', max_length=255, unique=True)
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=128)
    is_live = models.BooleanField(default=False)
    first_name = models.CharField(verbose_name='first name', max_length=255, default='')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'is_live', 'first_name']

    objects = MyUserManager()

    def __str__(self):
        return self.email

    # def has_perm(self, perm, obj=None):
    #     return True

    # def has_module_perms(self, app_label):
    #     return True
