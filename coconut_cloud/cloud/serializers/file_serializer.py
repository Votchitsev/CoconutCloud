from rest_framework import serializers
from coconut_cloud.cloud.models import File, User

import base64


class FileSerializer(serializers.ModelSerializer):

    class Meta:
        model = File
        fields = ['native_file_name', 'file']

    def create(self, *args, **kwargs):

        user = User.objects.filter(id = kwargs['user_id']).first()

        data = {
            'user_id': user,
            'storage_file_name': 'generated name',
            'native_file_name': self.validated_data['native_file_name'],
            'public_download_id': 'generated id',
            'file': self.validated_data['file'],
        }
        
        return File.objects.create(**data)
