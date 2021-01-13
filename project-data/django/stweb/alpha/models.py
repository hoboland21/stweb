from django.db import models
from passlib.hash import pbkdf2_sha256
# Create your models here.

import datetime

#=================================================================================
class UserDB(models.Model):
	fullname	= models.CharField(max_length=256)
	username	= models.CharField(max_length=128,primary_key=True)
	password	= models.CharField(max_length=1028)
	email		= models.EmailField(blank=True)
	token	   = models.CharField(max_length=512,blank=True)
	group		= models.CharField(max_length=128,blank=True)
	created  = models.DateTimeField(auto_now_add=True)
	modified = models.DateTimeField(auto_now=True)
#=================================================================================



	def save_passwd(self,pword):
		self.password = pbkdf2_sha256.hash(pword)

	def check_passwd(self,pword):
		return pbkdf2_sha256.verify(pword, self.password)