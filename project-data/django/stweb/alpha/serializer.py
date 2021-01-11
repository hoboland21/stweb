from rest_framework import serializers
from alpha.models import UserDB


class UserDBSerializer(serializers.Serializer):
    fullname	= serializers.CharField(max_length=256)
    username	= serializers.CharField(max_length=128)
    password	= serializers.CharField(max_length=1028)
    email		= serializers.EmailField(allow_blank=True)
    token	   = serializers.CharField(max_length=512,allow_blank=True)
    group		= serializers.CharField(max_length=128,allow_blank=True)

    def create(self, validated_data):
        """
        Create and return a new `UserDB` instance, given the validated data.
        """
        return UserDB.objects.create(**validated_data)

    def update(self, instance, validated_data):

#       Update and return an existing `UserDB` instance, given the validated data.

        instance.fullname = validated_data.get('fullname', instance.fullname)
        instance.username = validated_data.get('username', instance.username)
        instance.password = validated_data.get('password', instance.email)
        instance.email = validated_data.get('email', instance.language)
        instance.token = validated_data.get('token', instance.token)
        instance.group = validated_data.get('group', instance.group)
        instance.save()
        return instance