from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User, auth
from django.contrib import messages

# Create your views here.
def index(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = auth.authenticate(username = username, password =password  )

        if user is not None:
            auth.login(request , user)
            return redirect('/home')    
        else:
            messages.info(request, 'invalid username or password')
            return redirect("/")
    else:
        return render(request,'testdb/index.html')

def register(request):
    if request.method == 'POST':

        email = request.POST['email']
        username = request.POST['username']
        password= request.POST['password']
        first_name = request.POST['first-name']
        last_name = request.POST['last-name']


        user = User.objects.create_user(username = username, password = password , email = email)
        user.first_name = first_name
        user.last_name = last_name
        user.save()
        print('user created')
        return redirect('/home')

    return render(request,'testdb/register.html')

def home(request):
    return render(request, 'testdb/home.html')
