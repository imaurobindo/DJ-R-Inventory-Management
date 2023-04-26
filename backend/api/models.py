from django.db import models
import uuid


# Create your models here.
class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product_name = models.CharField(max_length=30)
    brand = models.CharField(max_length=30)
    product_price = models.CharField(max_length=30)
    product_category = models.CharField(max_length=50, default="")
    product_description = models.TextField(max_length=300, default="")
    product_image = models.ImageField(upload_to="images/product_images", default="")
    ratings = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table = "all_products"