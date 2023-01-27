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

        user = User.objects.filter(id=kwargs['user_id']).first()

        data = {
            'user_id': user,
            'storage_file_name': file.name,
            'native_file_name': self.validated_data['native_file_name'],
            'public_download_id': generate_download_id(20),
            'file': file,
        }
        
        try:
            file_model = FileModel.objects.create(**data)

            return file_model

        except Exception as e:
            error = {
                'message': ', '.join(e.args) if len(e.args) > 0 else 'Unknown Error'
            }
            raise serializers.ValidationError(error)


    def put(self, *args, **kwargs):

        file = FileModel.objects.filter(user_id=kwargs['user_id']).all().filter(id=kwargs['id']).first()

        if file:
            file.native_file_name = kwargs['native_file_name']

            return file.save()
