from django.shortcuts import render
from rest_framework import viewsets          # add this
from .serializers import OSMSerializer      # add this
from .models import OSMRouterModel                     # add this

class OSMView(viewsets.ModelViewSet):       # add this
    serializer_class = OSMSerializer          # add this
    queryset = OSMRouterModel.objects.all()        