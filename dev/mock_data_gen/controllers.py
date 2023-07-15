import requests
import json
import os

from faker import Faker
from dotenv import load_dotenv

load_dotenv()

def create_user(email=None, password=None):
    fake = Faker()
    if not email:
        email = fake.email()
    if not password:
        password = fake.password()
    # set the env
    env = os.environ.get('MOCK_ENV') or 'dev'
    # set the url
    endpoint = 'auth/v1/signup'
    prod_url = 'https://pbvrdvvedzcmyjnvvetq.supabase.co/'
    dev_url = 'http://localhost:54321/'
    base_url = prod_url if env == 'prod' else dev_url
    url = base_url + endpoint
    # set the API_KEY
    dev_anon_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
    prod_anon_key = os.environ.get('SUPABASE_ANON_KEY')
    api_key = prod_anon_key if env == 'prod' else dev_anon_key
    # set the headers and data
    headers = {
        'apikey': api_key,
        'Content-Type': 'application/json'
    }
    data = {
        'email': email,
        'password': password
    }
    # make the request
    response = requests.post(url, headers=headers, data=json.dumps(data))
    # TODO - handle errors like collision on unique email
    if response.status_code != 200:
        print(response.json())
        raise Exception('User creation failed')
    return {
        "id": response.json()['id'],
        "email": email,
        "password": password
    }
