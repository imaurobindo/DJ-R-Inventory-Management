# Generated by Django 3.2.9 on 2023-05-07 11:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0026_auto_20230507_1652'),
    ]

    operations = [
        migrations.RunSQL("ALTER TABLE all_warehouses DROP CONSTRAINT id;"),
    ]