from rest_framework import serializers
from .models import Location


# creates Model into Serializer
# "converts into datatypes that can be rendered into JSON or XML"

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'
        
        # This attribute says we are NOT storing to a database
        # We might need to change this if we discover we need a db later on...
        managed = False