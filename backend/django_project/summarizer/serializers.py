from rest_framework import serializers
from .models import Summarize


class SummarizeSerializer(serializers.ModelSerializer):

  class Meta:
    model = Summarize
    fields = ["user","original_text","summarized_text"]

  

