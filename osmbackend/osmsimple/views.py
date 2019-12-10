from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpRequest, Http404, HttpResponseRedirect, JsonResponse
from django.contrib.auth.decorators import login_required
from django.db.models import Q
# Create your views here.

import osmnx as ox
import networkx as nx
import math

global G
is_graph_loaded = False

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
    print("From graph loader")
    global G
    G = ox.load_graphml('eastern-ma-network.graphml')
    # return G
    # return None

def geo_address(address):
    return ox.geocode(address)

def minimize(length, grade):
    penalty = grade ** 2
    return length * penalty

def maximize(length, grade):
    penalty = math.sqrt(grade)
    return length * penalty

def get_route(G, start, end, min_max):
    
    for u, v, k, data in G.edges(keys=True, data=True):
        data['minimize'] = minimize(data['length'], float(data['grade_abs']))
        data['maximize'] = maximize(data['length'], float(data['grade_abs']))
        data['rise'] = data['length'] * float(data['grade'])


    if min_max == "min":
        route = nx.shortest_path(G, source=start, target=end, weight='minimize')
    else:
        route = nx.shortest_path(G, source=start, target=end, weight='maximize')

    return route
    # route_by_length = nx.shortest_path(G, source=start, target=end, weight='length')
    # return route_by_length

def convert_g_dic(G):
    nodes, data = zip(*G.nodes(data=True))
    dict_by_id = {}
    
    for x in data:
        dict_by_id[x['osmid']] = x

    return dict_by_id

def get_steps(route, dic_by_id, origin, destination):
    list_steps = []
    list_steps.append([origin[1], origin[0]])
    for step in route:
        list_steps.append([dic_by_id[step]['x'], dic_by_id[step]['y']])
    list_steps.append([destination[1],destination[0]])
    return list_steps

def get_midpoint(origin, destination):
    return ([(origin[0] + destination[0])/2, (origin[1] + destination[1])/2])

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

def get_geocodes(request, address_from=None, address_to=None, min_max=None):
    print(request)
    print("this request wants route with--->>>", min_max)
    origin = geo_address(address_from)
    destination = geo_address(address_to)
    
    global is_graph_loaded
    print("From main : ", is_graph_loaded)
    if is_graph_loaded == False:
        print("Graph isn't loaded --> Loading it")
        load_graph()
        is_graph_loaded = True
    else:
        print("Graph is loaded")
    global G
    start = ox.get_nearest_node(G, origin)
    end = ox.get_nearest_node(G, destination)

    midpoint = get_midpoint(origin, destination)

    route = get_route(G, start, end, min_max)
    print("len of route: ", len(route))

    dic_nodeid = convert_g_dic(G)

    lat_lon_steps = get_steps(route, dic_nodeid, origin, destination)
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
        'lat_lon_steps' : lat_lon_steps,
        'elevation' : elev,
        'midpoint_lat' : str(midpoint[0]),
        'midpoint_lon' : str(midpoint[1]),
        'error' : False,
    }
    return JsonResponse(data)
