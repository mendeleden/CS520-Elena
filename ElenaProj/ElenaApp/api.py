from .models import Location
from rest_framework import viewsets, permissions
from .serializers import LocationSerializer

# Viewset = allows us to create a full API without having to specify functionality
# handles all endpoints for GET and POST
# SEE Django Documentation

class LocationViewSet(viewsets.ModelViewSet):
    serializer_class = LocationSerializer
    queryset = Location.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]