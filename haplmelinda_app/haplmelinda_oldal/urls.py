from django.urls import path

from . import views

urlpatterns = [
    path('', views.album, name='album'),
    path('rolam', views.rolam, name='rolam'),
    path("<str:id>/", views.kep_reszletek, name="kep_reszletek"),
    path("delete/<str:id>/", views.delete_kep, name="delete_kep"),
    path("update/<str:id>/", views.update_kep, name="update_kep"),
    path("create_kep", views.create_kep, name="create_kep"),
    path("kosar", views.kosar, name="kosar")
]
