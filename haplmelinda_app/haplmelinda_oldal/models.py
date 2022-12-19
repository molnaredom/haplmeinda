from django.db import models


class Kep(models.Model):
    sorszam = models.IntegerField()
    cim = models.CharField(max_length=200)
    leiras = models.CharField(max_length=500)
    ar = models.IntegerField()
    belso_meret = models.CharField(max_length=200)
    kulso_meret = models.CharField(max_length=200)
    tema = models.CharField(max_length=200)
    technika = models.CharField(max_length=200)
    eladva = models.BooleanField()
    # keszites_datuma = models.DateTimeField('date published')
    kep = models.ImageField(upload_to='upload/')

    def __str__(self):
        return self.cim

