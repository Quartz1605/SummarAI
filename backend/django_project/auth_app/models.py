from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class MyUser(AbstractUser):
  age = models.CharField(null=True,blank=True,max_length=10)
  phone_number = models.CharField(null=True,blank=True,max_length=20)

  def __str__(self):
    return self.username



