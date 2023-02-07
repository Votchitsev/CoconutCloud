"""coconut_cloud URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken import views

from coconut_cloud.cloud.views.user_view import RegistrUserView
from coconut_cloud.cloud.views.file_views import FileView
from coconut_cloud.cloud.views.file_transfer_view import get_link, get_file

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('registr/', RegistrUserView.as_view(),),
    path('files/', FileView.as_view()),
    path('link/', get_link),
    path('link/<str:link>/', get_file),
]
