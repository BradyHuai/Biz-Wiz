from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class UserProfile(AbstractUser):
    industry = models.CharField(max_length=80)
    location = models.CharField(max_length=80)
    is_Business = models.BooleanField(default=False)
    is_Individual = models.BooleanField(default=False)


class Business(UserProfile):
    business_name = models.CharField(max_length=80)
    short_paragraph = models.TextField()
    image = models.ImageField(upload_to="profileImages",blank=True,null=True) 


class Individual(UserProfile):
    pass