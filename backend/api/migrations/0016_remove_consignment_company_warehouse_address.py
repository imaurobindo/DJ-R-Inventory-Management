# Generated by Django 3.2.9 on 2023-05-10 06:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_consignment_warehouse_address'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='consignment',
            name='company_warehouse_address',
        ),
    ]
