from django import forms
from django.contrib.auth.forms import UserCreationForm

from .models import *
from django.forms import ModelForm


class KepForm(ModelForm):
    class Meta:
        model = Kep
        fields = "__all__"


class KosarForm(ModelForm):
    class Meta:
        model = Kosar
        fields = "__all__"

class UserUpdateForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'email']
        widgets = {
            "username": forms.TextInput(attrs={'class': 'form-control'}),
            "email": forms.EmailInput(attrs={'class': 'form-control'})
        }


class ProfileUpdateForm(ModelForm):
    class Meta:
        model = Profile
        fields = "__all__"
        exclude = ['user']
