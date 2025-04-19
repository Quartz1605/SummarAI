from transformers import pipeline

summarizer_pipline = pipeline("summarization")

def summarize_text(text):
  result =  summarizer_pipline(text,max_length=150,min_length=30,do_sample=False)

  return result[0]['summary_text']