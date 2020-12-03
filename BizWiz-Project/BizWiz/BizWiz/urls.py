"""BizWiz URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from main.views import main, business, individual, api
from main import urls

urlpatterns = [
    path('home/', main.home, name='home'),
    path('admin/', admin.site.urls),
    #path('accounts/login/', main.login, name='login'),
    path('accounts/login/', api.LoginAPI.as_view(), name='login'),
    path('accounts/user', api.UserAPI.as_view(), name='user'),
    path('', include(urls)),
    path('accounts/', include('django.contrib.auth.urls')),
    path('accounts/signup/', main.SignUpView.as_view(), name='signup'),
    path('accounts/signup/business/', api.RegisterBusinessAPI.as_view(), name='business_signup'),
    path('accounts/signup/individual/', api.RegisterIndividualAPI.as_view(), name='individual_signup'),
    path('view_business/<str:business_name>', business.display_business, name='display_business'),
    # path('map/<str:business_name>', business.map_detail_view, name='map'),
    path('create-application', business.application_create_view),
    path('view-application/<str:id>', business.application_detail_view)

]
