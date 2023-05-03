from django.urls import path

from . import views

urlpatterns = [
    path('', views.album, name='album'),
    path('rolam', views.rolam, name='rolam'),
    path("<str:id>/", views.kep_reszletek, name="kep_reszletek"),
    path("delete/<str:id>/", views.delete_kep, name="delete_kep"),
    path("update/<str:id>/", views.update_kep, name="update_kep"),
    path("create_kep", views.create_kep, name="create_kep"),
    path("kosar", views.kosar, name="kosar"),
    path("loginUser", views.loginUser, name="loginUser"),
    path("logoutUser", views.logoutUser, name="logoutUser"),
    path("registerUser", views.registerUser, name="registerUser"),
    path("profil/<str:username>", views.profil, name="profil"),
    path("profil_modositas/<str:username>", views.profil_modositas, name="profil_modositas"),
    # path("hozzaadas_kosarhoz/<str:id>/", views.hozzaadas_kosarhoz, name="hozzaadas_kosarhoz")
]
