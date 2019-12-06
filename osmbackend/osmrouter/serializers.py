from rest_framework import serializers
from .models import OSMRouterModel

class OSMSerializer(serializers.ModelSerializer):
    class Meta:
        model = OSMRouterModel
        fields =  ('address_from', 'address_to', 'route_opt', 'start_point', 'end_point') # add this
