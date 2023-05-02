# Generated by Django 3.2.9 on 2023-05-02 07:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_sellerwarehouseaddress'),
    ]

    operations = [
        migrations.CreateModel(
            name='SellerAddress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pincode', models.CharField(max_length=50)),
                ('area', models.CharField(max_length=150)),
                ('city', models.CharField(max_length=150)),
                ('district', models.CharField(max_length=150)),
                ('state', models.CharField(max_length=150)),
                ('country', models.CharField(max_length=150)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'db_table': 'all_seller_addresses',
            },
        ),
    ]