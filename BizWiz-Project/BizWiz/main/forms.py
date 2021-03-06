from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.db import transaction

from main.models import Business, UserProfile, Location, Application

class UserProfileSignUpForm(UserCreationForm):
    address = forms.CharField(max_length=1024,required=True)
    zip_code = forms.CharField(max_length=12,required=True)
    city = forms.CharField(max_length=1024,required=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['email'].required = True
        self.fields['first_name'].required = True
        self.fields['last_name'].required = True

    class Meta():
        model = UserProfile
        fields = ("email", "first_name", "last_name", "industry",)


class BusinessSignUpForm(UserProfileSignUpForm):
    business_name = forms.CharField(max_length=80, required=True)
    short_paragraph = forms.CharField(widget=forms.Textarea,required=False)
    image = forms.ImageField(required=False) 


    @transaction.atomic
    def save(self):
        user = super().save(commit=False)
        user.is_Business = True
        user.username = self.cleaned_data.get('email')
        location = Location.objects.create(address=self.cleaned_data.get('address'),
                                           zip_code=self.cleaned_data.get('zip_code'),
                                           city=self.cleaned_data.get('city'))
        user.location = location
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
        location = Location.objects.create(address=self.cleaned_data.get('address'),
                                           zip_code=self.cleaned_data.get('zip_code'),
                                           city=self.cleaned_data.get('city'))
        user.location = location
        user.save()
        return user

class ApplicationForm(forms.ModelForm):
    # application_name = forms.CharField(widget=forms.TextInput(
    #     attrs={"placeholder": "Application Name"}
    # ))
    post = forms.IntegerField()
    num_questions = forms.IntegerField(min_value = 0, max_value = 10)
    q1 = forms.CharField(
        required=False, 
        widget=forms.Textarea(
        attrs={"rows":2, "cols":20}))
    q2 = forms.CharField(
        required=False, 
        widget=forms.Textarea(
        attrs={"rows":2, "cols":20}))
    q3 = forms.CharField(
        required=False, 
        widget=forms.Textarea(
        attrs={"rows":2, "cols":20}))
    class Meta:
        model = Application
        fields = [
            'post',
            'num_questions',
            'q1', 'q2', 'q3'
        ]

    # def clean_title(self):
    #     business_name = self.cleaned_data.get("business_name")
    #     if Business.objects.exclude(pk=self.instance.pk).filter(business_name=business_name).exists():
    #         raise forms.ValidationError(u'Business name "%s" is already in use.' % business_name)
    #     return business_name

    # def clean_email(self):        
    #     email = self.cleaned_data.get("email")
    #     if not email.endswith("com"):
    #         if not email.endswith("ca"):
    #             raise forms.ValidationError("This is not a valid email")
    #     return email