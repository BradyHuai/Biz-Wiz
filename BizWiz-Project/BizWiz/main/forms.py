from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.db import transaction

from main.models import Business, UserProfile, Industry

class UserProfileSignUpForm(UserCreationForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['email'].required = True
        self.fields['first_name'].required = True
        self.fields['last_name'].required = True

    class Meta():
        model = UserProfile
        fields = ("email", "first_name", "last_name", "industry", "location",)


class BusinessSignUpForm(UserProfileSignUpForm):
    business_name = forms.CharField(max_length=80, required=True)
    short_paragraph = forms.CharField(widget=forms.Textarea,required=False)
    image = forms.ImageField(required=False) 


    @transaction.atomic
    def save(self):
        user = super().save(commit=False)
        user.is_Business = True
        user.username = self.cleaned_data.get('email')
        user.save()
        business = Business.objects.create(user_profile=user)
        business.business_name = self.cleaned_data.get('business_name')
        print(self.cleaned_data.get('business_name'))
        business.short_paragraph = self.cleaned_data.get('short_paragraph')
        business.image = self.cleaned_data.get('image')
        business.save()
        return user


class IndividualSignUpForm(UserProfileSignUpForm):
    @transaction.atomic
    def save(self):
        user = super().save(commit=False)
        user.is_Individual = True
        user.username = self.cleaned_data.get('email')
        user.save()
        return user
