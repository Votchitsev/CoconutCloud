from django.core.files import File

from rest_framework import serializers
from coconut_cloud.cloud.models import FileModel, User
from coconut_cloud.cloud.storage_file_name import generate_storage_file_name
from coconut_cloud.cloud.download_id import generate_download_id


class FileSerializer(serializers.ModelSerializer):

    class Meta:
        model = FileModel
        fields = ['native_file_name', 'file']

    def create(self, *args, **kwargs):

        file = File(self.validated_data['file'])

        file.name = generate_storage_file_name(file.name)

        user = User.objects.filter(id = kwargs['user_id']).first()

        data = {
            'user_id': user,
            'storage_file_name': file.name,
            'native_file_name': self.validated_data['native_file_name'],
            'public_download_id': generate_download_id(20),
            'file': file,
        }
        
        return FileModel.objects.create(**data)
