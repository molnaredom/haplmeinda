from django.shortcuts import render, redirect
from .models import *
from .forms import *


def update_kep(request, id):
    kep_obj = Kep.objects.get(id=id)
    form = KepForm(instance=kep_obj)

    if request.method == 'POST':
        form = KepForm(request.POST, files=request.FILES, instance=kep_obj)
        # form = KepForm(data=request.POST, files=request.FILES, instance=profile)
        if form.is_valid():
            form.save()
            return render(request, 'kep_reszletek.html', {"kep": kep_obj, 'form': form})

    return render(request, 'update_kep.html', {"kep": kep_obj, 'form': form})


def create_kep(request):
    form = KepForm()
    if request.method == "POST":
        form = KepForm(data=request.POST, files=request.FILES)
        if form.is_valid():
            form.save()
            print("Sikeres Kép készítés")
            return redirect("album")
        else:
            print("Nem valid a form")

    context = {'form': form}
    return render(request, "update_kep.html", context)


def kosar(request):
    kosar_tartalom = Kosar.objects.get(user=request.user.id).kepek.all()

    print("Kosár tartalom: ", kosar_tartalom)
    if request.method == 'POST' and 'torles' in request.POST:
        kosar = Kosar.objects.get(user_id=request.user.id)
        kosar_form_obj = KosarForm(instance=kosar).save(commit=False)
        kosar_form_obj.kepek.remove(request.POST["torles"])
        kosar_form_obj.save()

    context = {'kosar': kosar_tartalom}
    return render(request, "kosar.html", context)

def delete_kep(request, id):
    jegy = Kep.objects.get(id=id)
    if request.method == "POST":
        jegy.delete()
        return redirect("album")
    return render(request, "delete.html", {"obj": jegy})


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
            return render(request, 'kepek.html', {'kepek_tomb': kepek})
    if request.method == 'POST' and 'kosarba' in request.POST:
        kosar = Kosar.objects.get(user_id=request.user.id)
        ujkep = Kep.objects.get(id=request.POST["kosarba"])

        kosar_form_obj = KosarForm(instance=kosar).save(commit=False)
        kosar_form_obj.kepek.add(ujkep.id)
        kosar_form_obj.save()

        return redirect('kosar')

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
