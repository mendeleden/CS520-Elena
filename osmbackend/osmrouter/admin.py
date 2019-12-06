from django.contrib import admin
from .models import OSMRouterModel

class OSMAdmin(admin.ModelAdmin):  # add this
    list_display = ('address_from', 'address_to', 'route_opt', 'start_point', 'end_point') # add this

    # Register your models here.
admin.site.register(OSMRouterModel, OSMAdmin) # add this