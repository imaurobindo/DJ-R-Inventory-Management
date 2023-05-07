# Generated by Django 3.2.9 on 2023-05-07 11:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0022_remove_warehouse_warehouse_address'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='warehouse',
            name='id',
        ),
        migrations.AlterField(
            model_name='warehouse',
            name='warehouse_name',
            field=models.CharField(max_length=50, primary_key=True, serialize=False),
        ),
    ]