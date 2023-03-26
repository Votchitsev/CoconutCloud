from django.http import FileResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from datetime import date

from coconut_cloud.cloud.serializers.file_serializer import FileSerializer
from coconut_cloud.cloud.models import FileModel
from ..models import file_system


class FileView(APIView):

    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return FileModel.objects.all()

        return FileModel.objects.filter(user=self.request.user.id).all()

    def get(self, request):

        if 'id' not in request.query_params:
            files = self.get_queryset().values('id', 'user__username', 'size', 'native_file_name', 'upload_date', 'last_download_date', 'comment')
            return Response(files)
        
        file = self.get_queryset().filter(id = request.query_params['id']).first()

        if file:
            file.last_download_date = date.today()
            file.save()
            return FileResponse(file.file, status.HTTP_200_OK, as_attachment=True)

        data = {
                'message': 'The file not found',
            }
        
        return Response(data, status=status.HTTP_404_NOT_FOUND)
    
    def post(self, request):
        serializer = FileSerializer(data=request.data)

        data = {}

        if serializer.is_valid():
            serializer.create(user_id=request.user.id, file=request.FILES['file'])

            data = self.get_queryset().values('id', 'user__username', 'size', 'native_file_name', 'upload_date', 'last_download_date', 'comment')
            
            return Response(data, status=status.HTTP_200_OK) 

        data = serializer.errors

        return Response(data)

    def patch(self, request):
        serializer = FileSerializer(data=request.data)

        data = {}

        if serializer.is_valid():
            serializer.patch(
                user_id=request.user.id,
                )

            data = self.get_queryset().values('id', 'user__username', 'size', 'native_file_name', 'upload_date', 'last_download_date', 'comment')

            return Response(data)

        data = serializer.errors
        
        return Response(data)

    def delete(self, request):
        if request.user.is_staff:
            deleted_file = FileModel.objects.filter(id=int(request.query_params['id'])).first()
        else:
            deleted_file = FileModel.objects.filter(user_id=request.user.id).all().filter(id=int(request.query_params['id'])).first()

        if deleted_file:
            file_system.delete(deleted_file.storage_file_name)

            deleted_file.delete()

            data = self.get_queryset().values('id', 'user__username', 'size', 'native_file_name', 'upload_date', 'last_download_date', 'comment')
       
            return Response(data, status.HTTP_200_OK)

        data = {
            'message': 'The file not found',
        }
        
        return Response(data, status.HTTP_404_NOT_FOUND)
