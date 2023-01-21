from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from coconut_cloud.cloud.models import File
from rest_framework.parsers import JSONParser
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from coconut_cloud.cloud.serializers.file_serializer import FileSerializer


class FileView(CreateAPIView):
    
    def post(self, request):
        serializer = FileSerializer(data = request.data)

        data = {}

        if serializer.is_valid():
            serializer.create(user_id = request.user.id)

            data['response'] = True
            
            return Response(data, status = status.HTTP_200_OK) 

        data = serializer.errors

        return Response(data)