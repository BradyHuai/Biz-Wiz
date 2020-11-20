from django.contrib import admin
from .models import Business, Individual, UserProfile, Industry, Location

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(Business)
admin.site.register(Individual)
admin.site.register(Industry)
admin.site.register(Location)