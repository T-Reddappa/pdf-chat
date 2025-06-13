import boto3
import os

s3 = boto3.client('s3')
BUCKET = "red--bucket"
PREFIX = "pdf_QA/"

def upload_file_to_s3(file_content, filename):
    key = f"{PREFIX}{filename}"
    s3.put_object(Bucket=BUCKET, Key=key, Body=file_content)
    return f"https://{BUCKET}.s3.amazonaws.com/{key}"