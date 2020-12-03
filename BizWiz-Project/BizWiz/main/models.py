from django.db import models
from django.contrib.auth.models import AbstractUser
from .industries import Industries
# Create your models here.

class Location(models.Model):
    address = models.CharField("Address line 1", max_length=1024)
    zip_code = models.CharField("ZIP / Postal code",max_length=12)
    city = models.CharField("City",max_length=1024)

    class Meta:
        verbose_name = "Location Address"
        verbose_name_plural = "Location Addresses"

    def __str__(self):
        return "{} {} {}".format(self.address, self.zip_code, self.city)


class UserProfile(AbstractUser):
    industry = models.CharField(max_length=30, choices=(Industries.get()), null=True)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, null=True)
    is_Business = models.BooleanField(default=False)
    is_Individual = models.BooleanField(default=False)


class Business(models.Model):
    user_profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE, primary_key=True)
    business_name = models.CharField(max_length=80)
    website = models.URLField(max_length=200, null=True)
    short_paragraph = models.TextField()
    image = models.ImageField(upload_to="businessImages", blank=True, null=True) 

    def __str__(self):
        return self.business_name

    def image_tag(self):
        return u'<img src="%s" />' % self.image.url


class Individual(models.Model):
    user_profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE, primary_key=True)


class Post(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    position = models.TextField(max_length=1024)
    post_title = models.CharField(max_length=1024)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    salary = models.TextField(max_length=1024)
    deadline = models.TextField(max_length=1024)
    small_description = models.TextField(max_length=1024)
    description = models.TextField(max_length=1024, null=True)
    requirements = models.TextField(max_length=1024, null=True)
    notes = models.TextField(max_length=1024, null=True)

    def __str__(self):
        return self.post_title

class Application(models.Model):
    # post = models.ForeignKey(Post, on_delete=models.CASCADE)
    # num_questions = models.IntegerField(default=10)
    q1 = models.TextField(blank=True, null=True)
    q2 = models.TextField(blank=True, null=True)
    q3 = models.TextField(blank=True, null=True)
    q4 = models.TextField(blank=True, null=True)
    q5 = models.TextField(blank=True, null=True)

    # def __str__(self):
    #     return self.id