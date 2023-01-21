from rest_framework import serializers
from coconut_cloud.cloud.models import File, User


class FileSerializer(serializers.ModelSerializer):

    class Meta:
        model = File
        fields = ['native_file_name']

    def create(self, *args, **kwargs):

        user = User.objects.filter(id = kwargs['user_id']).first()

        data = {
            'user_id': user,
            'storage_file_name': 'generated name',
            'native_file_name': self.validated_data['native_file_name'],
            'public_download_id': 'generated id',
        }
        return File.objects.create(**data)
