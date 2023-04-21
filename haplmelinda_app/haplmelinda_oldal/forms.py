from .models import Kep
from django.forms import ModelForm


class KepForm(ModelForm):
    class Meta:
        model = Kep
        fields = "__all__"
