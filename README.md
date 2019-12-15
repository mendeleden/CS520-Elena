# Elevation Navigation System

Project By: Danny Sanatar, Eden Mendel, Janja Kovacevic, Temma Eventov

## What Makes Our EleNa Special 

  - Containers : the backend, which provides the routing services is built inside a container which allow it to be scalable.
  - Fast Routing : By elevating Python's global variables and Django capabilities the backend server only needs to load the graph into memory once (slow), but once loaded into memory is able to serve routing requests very quickly.


# Technology Stack

**Frontend:**
  * Node.js
  * React.js 
  * Mapboxgl: https://www.mapbox.com/
    * Powered by Open Street Maps to render routes
  
**Backend:**
  * Python 3.7: https://www.python.org/downloads/release/python-370/
  * Django: https://www.djangoproject.com/download/
  * OSMNX: https://osmnx.readthedocs.io/en/stable/
    * Used to import street data
    * Used in our algorithm to calculate:
      * Shortest Path (Dijkstra)
      * Maximum Elevation
      * Minimum Elevation

## Link to the hosted application:
  * Front-End : http://ec2-34-203-209-61.compute-1.amazonaws.com:3000/
    * Region : us-east-1
    * ec2 instance type : t2.medium
  * Back-End: http://ec2-52-90-226-146.compute-1.amazonaws.com:8000/
    * Region : us-east-1
    * ec2 instance type : t2.large

