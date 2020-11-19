from django.shortcuts import redirect, render
from django.views.generic import TemplateView
from django.contrib.auth.models import auth
from django.contrib import messages
import json
from django.http import HttpResponse


def cur_user(request):
    if request.method == "GET":
        user = request.user
        data = {'id': user.id}
        dump = json.dumps(data)
        return HttpResponse(dump, content_type='application/json')
