from django.urls import include, path
from knox import views as knox_views
from .views import main, api, business

urlpatterns = [
    path('home', main.home, name='home'),
    path('api/options', api.OptionsView.as_view()),
    path('api/listings', api.PostingList.as_view()),
    path('api/post', api.PostView.as_view()),
    path('api/profile', api.ProfileView.as_view()),
    # path('api/auth', include('knox.urls')),
    # path('api/auth/register/business', business.BusinessSignUpView.as_view(), name='business_signup'),
    # path('api/auth/login', api.LoginAPI.as_view()),
    # path('api/auth/user', api.UserAPI.as_view()),
    # path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout')
    path('api/application', api.ApplicationView.as_view()),
    path('api/application-list/', api.applicationList),
    path('api/application-detail/<str:pk>/', api.applicationDetail),
    path('api/application-create/', api.applicationCreate),
    path('api/application-update/<str:pk>/', api.applicationUpdate),
    path('api/application-delete/<str:pk>/', api.applicationDelete)
    
]