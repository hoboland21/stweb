"""stweb URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
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
from django.urls import path, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets,permissions
from alpha.views import UserDBList, UserDBView, UserDBAuth


urlpatterns = [
    
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('users/', UserDBList.as_view()),
    path('users/auth/', UserDBAuth.as_view()),
    path('users/view/<str:username>/',UserDBView.as_view())
]