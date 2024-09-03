from django.shortcuts import render
import os
from dotenv import load_dotenv

load_dotenv()

url: str = os.environ.get("URL")
key: str = os.environ.get("KEY")

print(url, key)
