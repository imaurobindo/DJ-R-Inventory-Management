# Generated by Django 3.2.9 on 2023-05-10 09:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0018_consignment_company_warehouse_address'),
    ]

    operations = [
        migrations.AddField(
            model_name='listing',
            name='product_stock',
            field=models.IntegerField(null=True),
        ),
    ]