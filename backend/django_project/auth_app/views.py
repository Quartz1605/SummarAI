from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import RegistrationSerializer
from rest_framework.response import Response
from rest_framework import status


# Create your views here.

class RegisterView(APIView):
  
  def post(self,request):
    serializer = RegistrationSerializer(data=request.data)

    if serializer.is_valid():
      serializer.save()
      return Response({"message" : "User created Successfully !"}, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


