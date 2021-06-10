from django.urls import path
from . import views
from django.conf.urls import url

urlpatterns = [
    url(r'rumortitle/', views.match),
    url(r'news/', views.judge),
    url(r'a/',views.showcontent)
]