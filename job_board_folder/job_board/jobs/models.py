from django.db import models

# Create your models here.

class Job(models.Model):
    title = models.CharField("Name", max_length=240)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    description = models.CharField(max_length=750)
    registrationDate = models.DateField("Registration Date", auto_now_add=True)

    def __str__(self):
        return self.name