# Generated by Django 3.2.9 on 2023-05-02 07:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_selleraddress'),
    ]

    operations = [
        migrations.AddField(
            model_name='selleraddress',
            name='street_address',
            field=models.CharField(default='', max_length=300),
        ),
    ]