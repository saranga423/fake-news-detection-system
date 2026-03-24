# Text Cleaner for Fake News Detection
import re

def clean_text(text: str) -> str:
    text = re.sub(r"[^\w\s]", "", text)
    text = text.strip().lower()
    return text
  
  