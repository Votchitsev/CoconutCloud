from coconut_cloud.cloud.models import FileModel
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from coconut_cloud.cloud.serializers.file_serializer import FileSerializer


class FileView(CreateAPIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        files = FileModel.objects.all()
        serializer = FileSerializer(files, many = True)

        return Response(serializer.data)
    
    def post(self, request):
        serializer = FileSerializer(data = request.data)

        data = {}

        if serializer.is_valid():
            serializer.create(user_id = request.user.id, file = request.FILES['file'])

            data['response'] = True
            
            return Response(data, status = status.HTTP_200_OK) 

        data = serializer.errors

        return Response(data)
