from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('rolam', views.rolam, name='rolam'),
    path("<str:id>/", views.kep_reszletek, name="kep_reszletek")
]
