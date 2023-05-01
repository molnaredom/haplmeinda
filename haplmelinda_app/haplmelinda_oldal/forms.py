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
