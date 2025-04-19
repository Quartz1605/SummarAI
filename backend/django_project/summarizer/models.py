from django.db import models
from auth_app.models import MyUser


# Create your models here.

class Summarize(models.Model):
  user = models.ForeignKey(MyUser,on_delete=models.CASCADE)
  original_text = models.TextField() 
  summarized_text = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.original_text
