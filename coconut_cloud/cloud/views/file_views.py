from django.http import FileResponse
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from coconut_cloud.cloud.serializers.file_serializer import FileSerializer
from coconut_cloud.cloud.models import FileModel


class FileView(CreateAPIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        if not request.query_params['id']:
            files = FileModel.objects.all()
            serializer = FileSerializer(files, many = True)

            return Response(serializer.data)
        
        file = FileModel.objects.filter(user_id = request.user.id).all().filter(id = request.query_params['id']).first()

        return FileResponse(file.file, status.HTTP_200_OK)
    
    def post(self, request):
        serializer = FileSerializer(data = request.data)

        data = {}

        if serializer.is_valid():
            serializer.create(user_id = request.user.id, file = request.FILES['file'])

            data['response'] = True
            
            return Response(data, status = status.HTTP_200_OK) 

        data = serializer.errors

        return Response(data)

    def delete(self, request):
        deleted_file = FileModel.objects.filter(user_id = request.user.id).all().filter(id = int(request.query_params['id'])).first()

        if deleted_file:
            deleted_file.delete()
        
            return Response(status.HTTP_200_OK)
        
        return Response(status.HTTP_204_NO_CONTENT)
