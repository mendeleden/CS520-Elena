from django.db import models

class Location(models.Model):
    # TODO
    # We have to change this model to fit whatever OPS gives us
    # This will be used to send data to frontend
    xPos = models.IntegerField
    yPos = models.IntegerField
    address = models.CharField(max_length=200)

    objects = models.Manager()
