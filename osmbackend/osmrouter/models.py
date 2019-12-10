from django.db import models
from django.utils.encoding import smart_text
from django.utils import timezone
from django.core.exceptions import ValidationError
import numpy as np
import osmnx as ox

# Create your models here.
# user : cs520, password : cs520

ROUTE_OPTINS = (
    #first value ->store in db, second value->what to display
    ('max_elevation', 'MAX_ELEVATION'),
    ('min_elevation', 'MIN_ELEVATION'),
)

def check(val):
    print("somethig something", val)

class OSMRouterModel(models.Model):
    # relates to the db, a way to refernce a specific item in the model
    # comes in by default
    id              = models.BigAutoField(primary_key=True) #auto inc
    # can add uniqe=True
    address_from    = models.CharField(max_length=300, verbose_name="Address From to Start")
    address_to      = models.CharField(max_length=300)
    route_opt       = models.CharField(max_length=120)
    date_searched   = models.DateField(default=timezone.now())
    start_point     = ""
    end_point       = ""
    check(address_from)

    def save(self, *args, **kwargs):
        if not self.start_point or self.end_point:
            self.start_point = ox.geocode(self.address_from)
            self.end_point = ox.geocode(self.address_to)
        super(OSMRouterModel, self).save(*args, **kwargs)

    class Meta:
        verbose_name = "Route"
        verbose_name_plural = "Routes"
    
    # name the model obj name
    def __str__(self):
        #use smart_text to render str correctly
        return smart_text(self.address_from+"-->"+self.address_to)

# outside of the class
# def post_model_pre_save_rec():
#     pass

# def post_model_post_save_rec():
#     pass