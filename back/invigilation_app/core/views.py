from django.http import HttpResponse
from django.contrib.auth.models import User
from django.core.serializers import serialize
from django.contrib.auth import login, authenticate
from django.views.decorators.csrf import csrf_exempt


def index(request):
    qs = User.objects.all()
    data = serialize("json", qs)
    return HttpResponse(data, content_type="application/json")


@csrf_exempt
def register(request):
    if request.method == "POST":
        print(request.body)
    print(request.method)
    return HttpResponse('register')


# def logout():
#     return HttpResponse('logout')


# def deleteAccount():
#     return HttpResponse('delete account')


# def me(request):
#     # query = User.objects.get()
#     return HttpResponse("Cześć to ja")
