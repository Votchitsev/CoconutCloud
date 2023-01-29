from django.core.files import File

from rest_framework import serializers
from coconut_cloud.cloud.models import FileModel, User
from coconut_cloud.cloud.storage_file_name import generate_storage_file_name
from coconut_cloud.cloud.download_id import generate_download_id
from coconut_cloud.cloud.validators import putValidator


class FileSerializer(serializers.ModelSerializer):

    class Meta:
        model = FileModel
        fields = ['file', 'comment']

    def create(self, *args, **kwargs):

        file = File(self.validated_data['file'])

        native_file_name = file.name

        file.name = generate_storage_file_name(file.name)

        user = User.objects.filter(id=kwargs['user_id']).first()

        data = {
            'user': user,
            'storage_file_name': file.name,
            'native_file_name': native_file_name,
            'size': file.size,
            'comment': self.validated_data['comment'],
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

        validated_data = putValidator(self.initial_data)

        file = FileModel.objects.filter(user_id=kwargs['user_id']).all().filter(id=validated_data['id']).first()

        if file:
            file.native_file_name = validated_data['native_file_name']
            file.comment = validated_data['comment']

            return file.save()
