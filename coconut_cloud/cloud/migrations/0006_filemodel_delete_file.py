# Generated by Django 4.1.5 on 2023-01-25 17:13

from django.conf import settings
import django.core.files.storage
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cloud', '0005_file_file'),
    ]

    operations = [
        migrations.CreateModel(
            name='FileModel',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('storage_file_name', models.CharField(max_length=50, unique=True)),
                ('native_file_name', models.CharField(max_length=50, unique=True)),
                ('public_download_id', models.CharField(max_length=50, unique=True)),
                ('file', models.FileField(blank=True, storage=django.core.files.storage.FileSystemStorage(location='storage'), upload_to='')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.DeleteModel(
            name='File',
        ),
    ]
