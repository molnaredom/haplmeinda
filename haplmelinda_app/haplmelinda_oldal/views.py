from django.shortcuts import render
from .models import Kep


def kep_reszletek(request, id):
    konkret_kep = Kep.objects.get(id=id)
    return render(request, 'kep_reszletek.html', {"kep" : konkret_kep})

from django.db.models import F
def album(request):
    kepek = Kep.objects.all().order_by('?')
    print(request.POST)
    if request.method == 'POST' and 'tema' in request.POST:
        print("Téma alapján szűrés:", request.POST)
        tema_neve = request.POST["tema"]
        print(tema_neve)
        if tema_neve:
            kepek = Kep.objects.filter(tema=tema_neve).order_by('?')
    return render(request, 'album.html', {'kepek': kepek})

    oszlop1 = kepek.annotate(idmod3=F('id') % 3).filter(idmod3=0)
    oszlop2 = kepek.annotate(idmod3=F('id') % 3).filter(idmod3=1)
    oszlop3 = kepek.annotate(idmod3=F('id') % 3).filter(idmod3=2)

    return render(request, 'kepek.html',
                  {"kepek_tomb": kepek, "o1": oszlop1, "o2": oszlop2, "o3": oszlop3, })

def rolam(request):
    return render(request, 'rolam.html', {})


from django.views.generic import DetailView

class EmpImageDisplay(DetailView):
    model = Kep
    template_name = 'emp_image_display.html'
    context_object_name = 'emp'
