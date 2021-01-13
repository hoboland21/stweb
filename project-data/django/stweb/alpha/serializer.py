from rest_framework import serializers
from alpha.models import UserDB
from datetime import datetime

class UserDBSerializer(serializers.Serializer):
    fullname	= serializers.CharField(max_length=256,allow_blank=True)
    username	= serializers.CharField(max_length=128)
    email		= serializers.EmailField(allow_blank=True)
    token	   = serializers.CharField(max_length=512,allow_blank=True)
    group		= serializers.CharField(max_length=128,allow_blank=True)
    modified     = serializers.DateTimeField()

    def create(self, validated_data):
        """ 
        Create and return a new `UserDB` instance, given the validated data.
        """
        return UserDB.objects.create(**validated_data)

    def update(self, instance, validated_data):

#       Update and return an existing `UserDB` instance, given the validated data.

        instance.fullname = validated_data.get('fullname', instance.fullname)
        instance.email = validated_data.get('email', instance.email)
        instance.token = validated_data.get('token', instance.token)
        instance.group = validated_data.get('group', instance.group)
        instance.modified = datetime.now()
        
        instance.save()
        return instance

#====================================================================
class UserDBAuthSerializer(serializers.Serializer):
    fullname	= serializers.CharField(max_length=256,allow_blank=True)
    username	= serializers.CharField(max_length=128)
    password    = serializers.CharField(max_length=1028)
    email		= serializers.EmailField(allow_blank=True)
    token	   = serializers.CharField(max_length=512,allow_blank=True)
    group		= serializers.CharField(max_length=128,allow_blank=True)
    modified      = serializers.DateTimeField()
    def create(self, validated_data):
        """ 
        Create and return a new `UserDB` instance, given the validated data.
        """
        return UserDB.objects.create(**validated_data)

#====================================================================
class UserDBAuthCheckSerializer(serializers.Serializer):
    username	= serializers.CharField(max_length=128)
    password    = serializers.CharField(max_length=1028)
    def create(self, validated_data):
        """ 
        Create and return a new `UserDB` instance, given the validated data.
        """
        return UserDB.objects.create(**validated_data)
