from django.urls import path, include
from django.urls.resolvers import URLPattern
from .api import RegisterAPI, LoginAPI, UserAPI
from django.urls import path, re_path
from knox import views as knox_views

urlpatterns = [
    path('api/jobs', include('jobs.urls')),
    re_path(r'^api/jobs/register', RegisterAPI.as_view()),
    re_path(r'^api/jobs/login', LoginAPI.as_view()),
    re_path(r'^api/jobs/user', UserAPI.as_view()),
    re_path(r'^api/jobs/logout', knox_views.LogoutView.as_view(), name='knox_logout')
]