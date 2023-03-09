import json
from django.contrib.auth import authenticate, login
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response


@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({
        "message": "csrf cookie set"
        })

@require_POST
def login_view(request):
    data = json.loads(request.body)
    email = data.get('email')
    password = data.get('password')

    if email is None or password is None:
        return JsonResponse({
            "message": "Please enter both email and password"
        }, status=400)

    user = authenticate(email=email, password=password)

    if user is not None:
        login(request, user)

        return JsonResponse({
            "message": "success",
        })
    
    return JsonResponse(
        {
        "message": "invalid credentials"
        }, status=400
    )