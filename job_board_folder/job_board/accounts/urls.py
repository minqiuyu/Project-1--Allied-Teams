from django.urls import path, include
from django.urls.resolvers import URLPattern
from .api import RegisterAPI
from django.urls import path, re_path

urlpatterns = [
    path('api/jobs', include('jobs.urls')),
    re_path(r'^api/jobs/register', RegisterAPI.as_view()),
]