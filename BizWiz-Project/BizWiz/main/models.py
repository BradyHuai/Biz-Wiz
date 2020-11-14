from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    industry = models.CharField(max_length=80)
    location = models.CharField(max_length=80)

class Business(models.Model):
    profile = models.ForeignKey(UserProfile, related_name='Business',on_delete=models.CASCADE)
    business_name = models.CharField(max_length=80)
    short_paragraph = models.TextField()
    image = models.ImageField(upload_to="profileImages",blank=True,null=True) 

class Individual(models.Model):
    profile = models.ForeignKey(UserProfile, related_name='Individual',on_delete=models.CASCADE)