from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpRequest, Http404, HttpResponseRedirect, JsonResponse
from django.contrib.auth.decorators import login_required
from django.db.models import Q
# Create your views here.

import osmnx as ox
import networkx as nx

def get_graph():
    key ="<<put key here>>"
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

def get_midpoint(origin, destination):
    return ((origin[0] + destination[0])/2, (origin[1] + destination[1])/2)

def get_elevation(route, dic_by_id):
    list_elv = []
    for step in route:
        list_elv.append(dic_by_id[step]['elevation'])

    print(list_elv)
    print(type(list_elv))
    total_up = 0
    total_down = 0
    total_elv = float(list_elv[-1:][0]) - float(list_elv[0])
    for i in range(1, len(list_elv)):
        if (float(list_elv[i])- float(list_elv[i-1])) > 0 :
            total_up += float(list_elv[i])- float(list_elv[i-1])
        else:
            total_down += float(list_elv[i])- float(list_elv[i-1])  
    return [total_up, total_down, total_elv]

def get_geocodes(request, address_from=None, address_to=None):
    print(request)
    
    origin = geo_address("216, Pond Street, Natick, Massachusetts, 01760, USA")
    destination = geo_address("14, Mill Street, Natick, Massachusetts, 01760, USA")
    
    print("loading graph")
    G = load_graph()
    
    start = ox.get_nearest_node(G, origin)
    end = ox.get_nearest_node(G, destination)

    mid_point = get_midpoint(start, end)

    route = get_route(G, start, end)
    print("len of route: ", len(route))

    dic_nodeid = convert_g_dic(G)

    lat_lon_steps = get_steps(route, dic_nodeid)
    print("length of steps: ", len(lat_lon_steps))

    elev = get_elevation(route, dic_nodeid)
    print("total up: ", elev[0])
    print("total up: ", elev[1])
    print("total change: ", elev[2])
    data = {
        'from': address_from,
        'to' : address_to,
        'from_lat' : origin,
        'to_lat' : destination,
        'node_ids' : (str(start), str(end)),
        'route_nodeis' : str(route),
        'lat_lon_steps' : str(lat_lon_steps),
        'elevation' : str(elev),
        'mid_point' : str(mid_point),
        'error' : False,
    }
    return JsonResponse(data)
