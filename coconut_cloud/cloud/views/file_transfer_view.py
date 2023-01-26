'''Useful for file sharing: to generate a download link and to retrieve a file with it'''

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.http import FileResponse

from coconut_cloud.cloud.models import FileModel


class FileTransfer(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        user_id = request.user.id
        file_id = request.data['file_id']
        
        file = FileModel.objects.filter(user_id = user_id).filter(id = file_id).first()
        
        if file:
            data = {
                'link': file.public_download_id,
            }

            return Response(data, status = status.HTTP_200_OK)

        return Response(status = status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def get_file(request, link):
    file = FileModel.objects.filter(public_download_id = link).first()

    if file:
        return FileResponse(file.file, status.HTTP_200_OK)

    return Response(status = status.HTTP_404_NOT_FOUND)