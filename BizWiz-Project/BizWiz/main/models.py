from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class Industry(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class UserProfile(AbstractUser):
    industry = models.ForeignKey(Industry, on_delete=models.CASCADE, null=True)
    location = models.CharField(max_length=80)
    is_Business = models.BooleanField(default=False)
    is_Individual = models.BooleanField(default=False)


class Business(models.Model):
    user_profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE, primary_key=True)
    business_name = models.CharField(max_length=80)
    short_paragraph = models.TextField()
    image = models.ImageField(upload_to="businessImages", blank=True, null=True) 

    def __str__(self):
        return self.business_name

    def image_tag(self):
        return u'<img src="%s" />' % self.image.url


class Individual(models.Model):
    user_profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE, primary_key=True)