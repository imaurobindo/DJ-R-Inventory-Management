# Generated by Django 3.2.9 on 2023-05-01 02:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20230426_2146'),
    ]

    operations = [
        migrations.CreateModel(
            name='SellerWarehouseAddress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('s_warehouse_pincode', models.CharField(max_length=50)),
                ('s_warehouse_state', models.CharField(max_length=50)),
                ('s_warehouse_city', models.CharField(max_length=50)),
                ('s_warehouse_address_line1', models.CharField(max_length=150)),
                ('s_warehouse_address_line2', models.CharField(max_length=150)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'db_table': 'all_seller_warehouse_addresses',
            },
        ),
    ]
