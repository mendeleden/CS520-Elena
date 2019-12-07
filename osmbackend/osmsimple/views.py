from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpRequest, Http404, HttpResponseRedirect, JsonResponse
from django.contrib.auth.decorators import login_required
from django.db.models import Q
# Create your views here.

import osmnx as ox

def get_geocodes(request, address_from=None, address_to=None):
    print(request)
    from_lat = get_lon_lat(address_from)
    to_lat = get_lon_lat(address_to)
    
    if from_lat is None or to_lat is None:
        return JsonResponse({'error' : False})
        
    data = {
        'from': address_from,
        'to' : address_to,
        'from_lat' : from_lat,
        'to_lat' : to_lat,
        'error' : False,
    }
    return JsonResponse(data)


def get_lon_lat(address=None):
    if address is None:
        return None
    else:
        return ox.geocode(address)

def get_graph(place=None):
    if place is None:
        return None
    else:
        G = ox.graph_from_place(['Amherst, Massachusetts, USA'])
        return G


'''
start = ox.get_nearest_node(G, origin)
end = ox.get_nearest_node(G, destination)
route_by_length = nx.shortest_path(G, source=orig, target=dest, weight='length')
nodes, data = zip(*G.nodes(data=True))
dict_by_id = {}
for x in data:
    dict_by_id[x['osmid']] = x
list_steps = []
for step in route_by_length:
    list_steps.append([dict_by_id[step]['x'], dict_by_id[step]['y']])
print(list_steps)
'''