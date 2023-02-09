from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view

from coconut_cloud.cloud.models import User
from coconut_cloud.cloud.serializers.user_serializer import RegistrUserSerializer


class RegistrUserView(CreateAPIView):
    queryset = User.objects.all()

    serializer_class = RegistrUserSerializer

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegistrUserSerializer(data = request.data)

        data = {}

        if serializer.is_valid():
            serializer.save()

            data['response'] = True

            return Response(data, status=status.HTTP_200_OK)
        
        else:
            data = serializer.errors

            return Response(data, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def user_is_admin_view(request):

    data = {}
    
    if request.user.is_staff:
        data['is_admin'] = True
    else: 
        data['is_admin'] = False
    
    return Response(data, status=status.HTTP_200_OK)
