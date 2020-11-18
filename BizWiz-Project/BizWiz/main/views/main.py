from django.shortcuts import redirect, render
from django.views.generic import TemplateView
from django.contrib.auth.models import auth
from django.contrib import messages


class SignUpView(TemplateView):
    template_name = 'main/registration/signup.html'

def home(request):
    # if request.user.is_authenticated:
    #     if request.user.is_business:
    #         return redirect('teachers:quiz_change_list')
    #     else:
    #         return redirect('students:quiz_list')
    return render(request, 'main/home.html')


def login(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']

        user = auth.authenticate(username = email, password =password )

        if user is not None:
            auth.login(request , user)
            return redirect('home')    
        else:
            messages.info(request, 'invalid email or password')
            return redirect('login')
    else:
        return render(request,'main/registration/login.html')