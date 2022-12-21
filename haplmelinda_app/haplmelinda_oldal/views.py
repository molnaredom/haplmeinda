from django.shortcuts import render
from .models import Kep

from django import template

register = template.Library()

@register.filter
def modulo(num, val):
    return num % val


def kep_reszletek(request, id):
    konkret_kep = Kep.objects.get(id=id)
    return render(request, 'kep_reszletek.html', {"kep" : konkret_kep})


def album(request):
    kepek = Kep.objects.all().order_by('?')
    return render(request, 'kepek.html', {"kepek_tomb": kepek})

def rolam(request):
    return render(request, 'rolam.html', {})


from django.views.generic import DetailView

class EmpImageDisplay(DetailView):
    model = Kep
    template_name = 'emp_image_display.html'
    context_object_name = 'emp'
