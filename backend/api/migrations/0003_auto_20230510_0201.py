# Generated by Django 3.2.9 on 2023-05-09 20:31

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_warehouseaddress_warehouse_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='Brand',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('brand_name', models.CharField(max_length=30)),
                ('brand_description', models.TextField(default='', max_length=300)),
                ('brand_address', models.TextField(default='', max_length=300)),
            ],
        ),
        migrations.RenameField(
            model_name='product',
            old_name='product_image',
            new_name='product_image1',
        ),
        migrations.AddField(
            model_name='product',
            name='product_color',
            field=models.CharField(default='', max_length=30),
        ),
        migrations.AddField(
            model_name='product',
            name='product_image2',
            field=models.ImageField(default='', upload_to='images/product_images'),
        ),
        migrations.AddField(
            model_name='product',
            name='product_image3',
            field=models.ImageField(default='', upload_to='images/product_images'),
        ),
        migrations.AddField(
            model_name='product',
            name='product_image4',
            field=models.ImageField(default='', upload_to='images/product_images'),
        ),
        migrations.AddField(
            model_name='product',
            name='product_size',
            field=models.CharField(default='', max_length=30),
        ),
        migrations.CreateModel(
            name='Consignment',
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
                ('consignment_approved', models.BooleanField(default=False)),
                ('company_warehouse', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.warehouseaddress')),
                ('product_brand', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.brand')),
                ('product_category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.category')),
                ('product_sub_category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.subcategory')),
                ('product_sub_sub_category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.subsubcategory')),
                ('seller_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.seller')),
            ],
        ),
    ]
