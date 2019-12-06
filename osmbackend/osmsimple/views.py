from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpRequest, Http404, HttpResponseRedirect, JsonResponse
from django.contrib.auth.decorators import login_required
from django.db.models import Q
# Create your views here.

import osmnx as ox

def get_geocodes(request, address_from=None, address_to=None):
    print(request)
    from_lat = ox.geocode(address_from)
    to_lat = ox.geocode(address_to)
    
    data = {
        'from': address_from,
        'to' : address_to,
        'from_lat' : from_lat,
        'to_lat' : to_lat,
    }
    return JsonResponse(data)
