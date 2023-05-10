# Generated by Django 3.2.9 on 2023-05-10 06:08

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_auto_20230510_1123'),
    ]

    operations = [
        migrations.CreateModel(
            name='Listing',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('product_name', models.CharField(max_length=50)),
                ('product_brand_verification', models.FileField(default='', upload_to='files/verification_documents')),
                ('product_size', models.CharField(max_length=30)),
                ('product_color', models.CharField(default='', max_length=30)),
                ('product_price', models.CharField(max_length=30)),
                ('product_description', models.TextField(default='', max_length=300)),
                ('product_image1', models.ImageField(default='', upload_to='images/product_images')),
                ('product_image2', models.ImageField(default='', upload_to='images/product_images')),
                ('product_image3', models.ImageField(default='', upload_to='images/product_images')),
                ('product_image4', models.ImageField(default='', upload_to='images/product_images')),
                ('qc_pass_status', models.BooleanField(default=False)),
                ('product_brand', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.brand')),
                ('product_category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.category')),
                ('product_sub_category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.subcategory')),
                ('product_sub_sub_category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.subsubcategory')),
                ('seller_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.seller')),
                ('warehouse_address', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.warehouseaddress')),
            ],
        ),
        migrations.CreateModel(
            name='Consignment',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('product_name', models.CharField(max_length=50)),
                ('product_size', models.CharField(max_length=30)),
                ('product_color', models.CharField(default='', max_length=30)),
                ('product_price', models.CharField(max_length=30)),
                ('product_description', models.TextField(default='', max_length=300)),
                ('product_image1', models.ImageField(default='', upload_to='images/product_images')),
                ('product_image2', models.ImageField(default='', upload_to='images/product_images')),
                ('product_image3', models.ImageField(default='', upload_to='images/product_images')),
                ('product_image4', models.ImageField(default='', upload_to='images/product_images')),
                ('scheduled_time', models.DateTimeField(default='', null=True)),
                ('consignment_approved', models.BooleanField(default=False)),
                ('product_brand', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.brand')),
                ('product_category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.category')),
                ('product_sub_category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.subcategory')),
                ('product_sub_sub_category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.subsubcategory')),
                ('seller_address', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='api.selleraddress')),
                ('seller_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.seller')),
                ('warehouse_address', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='api.warehouseaddress')),
            ],
        ),
    ]
