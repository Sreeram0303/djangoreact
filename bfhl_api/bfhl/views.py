from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render
@api_view(['GET', 'POST'])
def bfhl(request):
    if request.method == 'POST':
        data = request.data.get('data', [])
        numbers = [x for x in data if x.isdigit()]
        alphabets = [x for x in data if x.isalpha()]
        highest_lowercase = max([x for x in alphabets if x.islower()], default="")

        response = {
            "is_success": True,
            "user_id": "your_name_ddmmyyyy",  # Replace with actual user_id
            "email": "your_email@xyz.com",    # Replace with actual email
            "roll_number": "ABCD123",         # Replace with actual roll number
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": [highest_lowercase] if highest_lowercase else []
        }
        return Response(response)

    elif request.method == 'GET':
        return Response({"operation_code": 1})
def index(request):
    return render(request, 'index.html')
