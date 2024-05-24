from django.db import models

class SKU(models.Model):
    medication_name = models.CharField(max_length=100)
    dose = models.CharField(max_length=50)
    presentation = models.CharField(max_length=50)
    unit = models.CharField(max_length=20)
    countries = models.TextField()  # Assuming countries are stored as a comma-separated string

    def __str__(self):
        return self.medication_name
