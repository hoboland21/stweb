from django.shortcuts import render
from passlib.hash import pbkdf2_sha256
# Create your views here.
from alpha.models import *
import datetime
from rest_framework import serializers
from rest_framework import status,viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from django.http import Http404
from .serializer import UserDBSerializer,UserDBAuthSerializer,UserDBAuthCheckSerializer
from passlib.hash import pbkdf2_sha256


#-----------------------------------------------------
class UserDBAuth(APIView) :
   def post(self, request,format=None) :
      serializer = UserDBAuthCheckSerializer(data=request.data)
      if serializer.is_valid() :
         try:
            user = UserDB.objects.get(username=serializer.validated_data["username"])
            if user.check_passwd(serializer.validated_data["password"]) :
               serializer2 = UserDBSerializer(user)
               return Response(serializer2.data)
         except:
            pass
      return Response(status=status.HTTP_204_NO_CONTENT)
#-----------------------------------------------------
class UserDBList(APIView):
   
   def get(self, request):
      users = UserDB.objects.all()
      serializer = UserDBSerializer(users, many=True)
      return Response(serializer.data)


   def post(self, request, format=None):
      serializer = UserDBAuthSerializer(data=request.data)
      if serializer.is_valid():
         serializer.validated_data["password"]  = pbkdf2_sha256.hash(serializer.validated_data["password"])
         try:
            serializer.save()
         except:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

         return Response(serializer.data, status=status.HTTP_201_CREATED)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#-----------------------------------------------------
class UserDBView(APIView) :
   def get_object(self,username):
      try:
         return UserDB.objects.get(username=username)
      except UserDB.DoesNotExist:
         raise Http404

   def get (self, request, username, format=None) :
      user = self.get_object(username)
      serializer = UserDBSerializer(user)
      return Response(serializer.data)

   def delete ( self, request, username, format=None):
      user = self.get_object(username)
      user.delete()
      return Response(status=status.HTTP_204_NO_CONTENT)

   def put (self, request, username, format=None):
      user = self.get_object(username)
      serializer = UserDBSerializer(user, data=request.data)
      if serializer.is_valid():
         serializer.save()
         return Response(serializer.data)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

