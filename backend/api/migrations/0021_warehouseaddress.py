# Generated by Django 3.2.9 on 2023-05-07 10:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0020_add_is_live_permission'),
    ]

    operations = [
        migrations.CreateModel(
            name='WarehouseAddress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pincode', models.CharField(max_length=50)),
                ('postoffice', models.CharField(max_length=150)),
                ('town_or_city', models.CharField(max_length=150)),
                ('district', models.CharField(max_length=150)),
                ('state', models.CharField(max_length=150)),
                ('country', models.CharField(max_length=150)),
                ('street_address', models.CharField(default='', max_length=300)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('warehouse_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.warehouse')),
            ],
            options={
                'db_table': 'all_warehouse_addresses',
            },
        ),
    ]
