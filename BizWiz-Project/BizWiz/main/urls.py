from django.urls import include, path

from .views import main

urlpatterns = [
    path('home', main.home, name='home'),
]