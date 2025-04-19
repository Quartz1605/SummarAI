from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class MyUser(AbstractUser):
  age = models.CharField(null=True,blank=True)
  phone_number = models.CharField(null=True,blank=True)

  def __str__(self):
    return self.username



