import base64

from rest_framework import serializers
from coconut_cloud.cloud.models import File, User
from coconut_cloud.cloud.storage_file_name import generate_storage_file_name
from coconut_cloud.cloud.download_id import generate_download_id


class FileSerializer(serializers.ModelSerializer):

    class Meta:
        model = File
        fields = ['native_file_name', 'file']

    def create(self, *args, **kwargs):

        user = User.objects.filter(id = kwargs['user_id']).first()

        storage_file_name = generate_storage_file_name(10, self.validated_data['file'].name)

        self.validated_data['file'].name = storage_file_name

        data = {
            'user_id': user,
            'storage_file_name': storage_file_name,
            'native_file_name': self.validated_data['native_file_name'],
            'public_download_id': generate_download_id(20),
            'file': self.validated_data['file'],
        }
        
        return File.objects.create(**data)
