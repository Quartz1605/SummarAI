from rest_framework import serializers
from rest_framework.response import Response
from .models import MyUser


class RegistrationSerializer(serializers.ModelSerializer):

  password = serializers.CharField(write_only=True)

  class Meta:
    model = MyUser
    fields = ["username","email","password","age","phone_number"]

  def create(self, validated_data):
    user = MyUser.objects.create_user(
      username=validated_data["username"],
      email=validated_data["email"],
      password=validated_data["password"],
      age=validated_data["age"],
      phone_number=validated_data["phone_number"],
    )

    return user
   

