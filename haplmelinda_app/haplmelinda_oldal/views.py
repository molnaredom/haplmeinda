from django.shortcuts import render
from .models import Kep

def index(request):
    kepek = Kep.objects.all()
    return render(request, 'kepek.html', {"kepek_tomb": kepek})

from django.views.generic import DetailView

class EmpImageDisplay(DetailView):
    model = Kep
    template_name = 'emp_image_display.html'
    context_object_name = 'emp'
