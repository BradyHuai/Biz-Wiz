from django.contrib.auth import login
from django.shortcuts import redirect, render
from django.views.generic import CreateView

from ..forms import BusinessSignUpForm
from ..models import UserProfile, Business

class BusinessSignUpView(CreateView):
    model = UserProfile
    form_class = BusinessSignUpForm
    template_name = 'main/registration/signup_form.html'

    def get_context_data(self, **kwargs):
        kwargs['user_type'] = 'Business'
        return super().get_context_data(**kwargs)

    def form_valid(self, form):
        user = form.save()
        login(self.request, user, backend='main.backends.EmailBackend')
        print("Success") 
        return redirect('home')


def display_business(request, business_name):
    try:
        business = Business.objects.get(business_name=business_name)
    except Business.DoesNotExist:
        return redirect('home')
    context = {'business': business}
    return render(request, 'main/business_display.html', context)