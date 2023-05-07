from django.db import migrations
from django.contrib.auth.models import Permission

class Migration(migrations.Migration):
    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('api', '0019_islive'),
    ]

    def generate_permissions(apps, schema_editor):
        Permission.objects.create(
            codename='is_live',
            name='Can access live feature',
            content_type_id=apps.get_model('contenttypes', 'contenttype').objects.get(app_label='api', model='islive').id
        )

    operations = [
        migrations.CreateModel(
            name='IsLive',
            fields=[
            ],
            options={
                'proxy': True,
                'verbose_name': 'Is Live',
                'verbose_name_plural': 'Is Live',
            },
            bases=('auth.permission',),
        ),
        migrations.RunPython(generate_permissions),
    ]
