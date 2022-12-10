from django.urls import path

from . import views

urlpatterns = [
    path('fooldal', views.index, name='index'),
]
