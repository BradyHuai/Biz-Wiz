from django.contrib.auth import login
from django.shortcuts import redirect, render
from django.views.generic import CreateView

from ..forms import BusinessSignUpForm, ApplicationForm
from ..models import UserProfile, Business, Application

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

def application_detail_view(request, business_name):
    application = get_object_or_404(Application, business_name=business_name)
    detail = {
        "application": application
    }
    return render(request, "main/Application/detail.html", detail)

def application_create_view(request):
    if request.method == "POST":
        business_name = request.POST.get('business_name')

    form = ApplicationForm(request.POST or None)
    if form.is_valid():
        form.save()
        form = ApplicationForm()
        Application.objects.create(**form.cleaned_data)

    context = {
        'form': form
    }
    return render(request, "main/application/create_application.html", context)