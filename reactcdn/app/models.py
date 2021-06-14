from django.db import models


class Order(models.Model):
    date = models.DateField(blank=False)
    name = models.CharField(max_length=100, blank=False, default='name')
    desc = models.CharField(max_length=500, blank=False, default='description')
    # quantity = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    # amount = models.DecimalField(decimal_places=2, max_digits=10, default=0)

    def __str__(self):
        return f"{self.date}: {self.item}"

    class Meta:
        ordering = ["-id"]
