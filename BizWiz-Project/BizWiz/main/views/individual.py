from django.contrib.auth import login
from django.shortcuts import redirect
from django.views.generic import CreateView

from ..forms import IndividualSignUpForm
from ..models import UserProfile

class IndividualSignUpView(CreateView):
    model = UserProfile
    form_class = IndividualSignUpForm
    template_name = 'main/registration/signup_form.html'

    def get_context_data(self, **kwargs):
        kwargs['user_type'] = 'Individual'
        return super().get_context_data(**kwargs)

    def form_valid(self, form):
        user = form.save()
        login(self.request, user, backend='main.backends.EmailBackend')
        print("Success") 
        return redirect('home')