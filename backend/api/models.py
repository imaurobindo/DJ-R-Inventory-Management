from django.db import models
import uuid


# Create your models here.
class SellerAddress(models.Model):
    pincode = models.CharField(max_length=50)
    area = models.CharField(max_length=150)
    city = models.CharField(max_length=150)
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
    warehouse_name = models.CharField(max_length=50)
    warehouse_address = models.CharField(max_length=150)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.warehouse_name
    
    class Meta:
        db_table = "all_warehouses"


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

