from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver

class Tema(models.Model):
    nev = models.CharField(max_length=200)
    def __str__(self):
        return self.nev

class Technika(models.Model):
    nev = models.CharField(max_length=200)
    def __str__(self):
        return self.nev

class Kep(models.Model):
    # ne valtoztass a sorrenden
    sorszam = models.IntegerField()
    cim = models.CharField(max_length=200)
    belso_meret = models.CharField(max_length=200)
    kulso_meret = models.CharField(max_length=200)
    ar = models.IntegerField()
    tema = models.ForeignKey(Tema, on_delete=models.CASCADE)
    technika = models.ForeignKey(Technika, on_delete=models.CASCADE)
    leiras = models.CharField(max_length=500)
    eladva = models.BooleanField()
    feltoltott_kep = models.ImageField(upload_to='upload/')

    def __str__(self):
        return self.cim




@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    instance.profile.save()

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    teljes_nev = models.CharField(max_length=200, blank=True, default="")
    telefon = models.CharField(max_length=15, blank=True, default="")
    szallitasi_hely = models.CharField(max_length=300, blank=True, default="")

    def __str__(self):
        return self.teljes_nev


class Kosar(models.Model): # Kepeket tarol,
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    kepek = models.ManyToManyField(Kep)

    # def __str__(self):
    #     return f"{self.user.username}'s Chart ({self.photos.count()} photos)"


class Rendeles(models.Model):
    kosar = models.ForeignKey(Kosar, on_delete=models.CASCADE)
    total_price = models.IntegerField(default=0)

    def __str__(self):
        return f"k{self.kosar}"
