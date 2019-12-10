from django.contrib import admin
from django.urls import path, include, re_path                 # add this
from .views import (
    get_geocodes,
)
urlpatterns = [
    path('/route/<str:address_from>/<str:address_to>/<str:min_max>', get_geocodes, name="get_route"),
]