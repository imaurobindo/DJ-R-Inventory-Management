# Generated by Django 3.2.9 on 2023-05-10 06:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_remove_consignment_company_warehouse_address'),
    ]

    operations = [
        migrations.RenameField(
            model_name='consignment',
            old_name='warehouse_address',
            new_name='selected_warehouse_address',
        ),
    ]