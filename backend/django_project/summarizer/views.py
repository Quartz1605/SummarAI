from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Summarize
from rest_framework import status
from .utils import summarize_text
from .serializers import SummarizeSerializer



# Create your views here.

class SummarizeView(APIView):

  def post(self,request):
    text = request.data.get("text","")

    if not text.strip():
      return Response({"message" : "text needs to be provided"},status=status.HTTP_400_BAD_REQUEST)
    
    summarized_text = summarize_text(text=text)

    summary_instance = Summarize.objects.create(
      user=request.user,
      text=text,
      summarized_text=summarized_text
    )

    serializer = SummarizeSerializer(summary_instance)
    return Response({"message" : "Task done successfully"},status=status.HTTP_201_CREATED)
    

