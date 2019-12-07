from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpRequest, Http404, HttpResponseRedirect, JsonResponse
from django.contrib.auth.decorators import login_required
from django.db.models import Q
# Create your views here.

import osmnx as ox
import networkx as nx

def get_graph():
    key ="AIzaSyCLr4LXvIZlqL7D1x39-AlnvwOxz6ZafO8"
    print("hey")
    place_query = ['Natick, Massachusetts, USA']
    G = ox.graph_from_place(place_query, network_type='walk')
    G = ox.add_node_elevations(G, key)
    G = ox.add_edge_grades(G)
    # G_projected = ox.project_graph(G)
    ox.save_graphml(G, filename='natick.graphml')
    print("done")

def load_graph():
    G = ox.load_graphml('natick.graphml')
    return G

def geo_address(address):
    return ox.geocode(address)

def get_route(G, start, end):
    route_by_length = nx.shortest_path(G, source=start, target=end, weight='length')
    return route_by_length

def convert_g_dic(G):
    nodes, data = zip(*G.nodes(data=True))
    dict_by_id = {}
    
    for x in data:
        dict_by_id[x['osmid']] = x

    return dict_by_id

def get_steps(route, dic_by_id):
    list_steps = []

    for step in route:
        list_steps.append([dic_by_id[step]['y'], dic_by_id[step]['x']])
    return list_steps

def get_geocodes(request, address_from=None, address_to=None):
    print(request)
    
    origin = geo_address("216, Pond Street, Natick, Massachusetts, 01760, USA")
    destination = geo_address("14, Mill Street, Natick, Massachusetts, 01760, USA")
    
    print("loading graph")
    G = load_graph()
    
    start = ox.get_nearest_node(G, origin)
    end = ox.get_nearest_node(G, destination)

    route = get_route(G, start, end)
    print("len of route: ", len(route))

    dic_nodeid = convert_g_dic(G)

    lat_lon_steps = get_steps(route, dic_nodeid)
    print("length of steps: ", len(lat_lon_steps))

    data = {
        'from': address_from,
        'to' : address_to,
        'from_lat' : origin,
        'to_lat' : destination,
        'node_ids' : (str(start), str(end)),
        'route_nodeis' : str(route),
        'lat_lon_steps' : str(lat_lon_steps),
        'error' : False,
    }
    return JsonResponse(data)
