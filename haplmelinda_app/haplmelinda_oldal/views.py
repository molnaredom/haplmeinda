from .forms import *
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt

import logging

logger = logging.getLogger('alaplogger')


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
        print(request.POST)
        form = KepForm(data=request.POST, files=request.FILES)
        if form.is_valid():
            form.save(commit=False)
            form.technika = int(request.POST["technika"])
            form.tema = int(request.POST["tema"])
            if form.is_valid():

                form.save()
                print("Sikeres Kép készítés")
                return redirect("album")
            print(form.errors)
        else:
            print("Nem valid a form")

    context = {'form': form}
    return render(request, "update_kep.html", context)


def profil(request, username):
    felhasznalo = User.objects.get(username=username)

    context = {'user': felhasznalo}

    return render(request, "profil.html", context)

def kosar(request):
    kosar_kepek = Kosar.objects.get(profile=request.user.id).kepek.all()
    kosar = Kosar.objects.get(profile=request.user.id)

    print("Kosár tartalom: ", kosar_kepek)
    if request.method == 'POST' and 'torles' in request.POST:
        kosar_form_obj = KosarForm(instance=kosar).save(commit=False)
        kosar_form_obj.kepek.remove(request.POST["torles"])
        kosar_form_obj.save()

    elif request.method == 'POST' and 'rendeles' in request.POST:

        form = RendelesForm().save(commit=False)
        form.kosar = kosar
        ossz_ar = sum([int(i.ar) for i in kosar.kepek.all()])
        form.total_price = ossz_ar
        form.save()
        return redirect("rendeles")

    context = {'kosar': kosar_kepek}
    return render(request, "kosar.html", context)


def rendeles(request):
    rendeles = Rendeles.objects.get(kosar=request.user.id)
    profile = Profile.objects.get(id=request.user.id)
    if request.method == 'POST' and 'rendeles_leadas' in request.POST:
        rendeles.delete()
        return redirect("album")

    return render(request, "rendeles.html", {"rendeles":rendeles, "profile": profile})

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

    if request.method == 'POST' and 'tema' in request.POST:
        tema_id = request.POST["tema"]
        if tema_id:
            kepek = Kep.objects.filter(tema=int(tema_id)).order_by('?')
    if request.method == 'POST' and 'kosarba' in request.POST:
        kosar = Kosar.objects.get(profile=request.user.id)
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


def loginUser(request):
    page = 'login'

    if request.user.is_authenticated:
        return redirect('home')

    if request.method == "POST":
        username = request.POST.get('username').lower()
        password = request.POST.get('password')
        try:
            user = User.objects.get(username=username)
        except:
            messages.error(request, "HIBA: A felhsználó még nem létezik")

        user = authenticate(request, username=username, password=password)  # hitelesito adatok

        if user is not None:
            login(request, user)
            return redirect('profil', user.username)
        else:
            messages.error(request, "A Felhasználónév vagy a jelszó nem létezik")

    context = {"page": page}
    return render(request, 'login_register.html', context)

@csrf_exempt
def registerUser(request):
    form = UserCreationForm()

    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.username = user.username.lower()
            user.save()
            login(request, user)
            return redirect('profil', user.username)
        else:
            messages.error(request, "ERROR: a regisztráció közben")

    return render(request, "login_register.html", {'form': form})

def logoutUser(request):
    logout(request)
    return redirect('album')


def profil_modositas(request, username):
    user_form = UserUpdateForm(instance=request.user)
    profile_form = ProfileUpdateForm(instance=request.user.profile)
    context = {
        'user_form': user_form,
        'profile_form': profile_form
    }

    if request.method == 'POST':
        form = ProfileUpdateForm(request.POST, files=request.FILES, instance=request.user.profile)
        if form.is_valid():
            form.save()
            return redirect("profil", str(username))
        else:
            context["errorok"] = form.errors
            return render(request, "profil_modositas.html", context)

    return render(request, "profil_modositas.html", context)

