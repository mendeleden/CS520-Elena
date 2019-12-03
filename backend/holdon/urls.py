from django.contrib import admin
from django.urls import path, include, re_path                 # add this
from .views import (
    post_model_list_view, 
    post_model_detailed_view,
    basic_ass_buitch
)
urlpatterns = [
    path('', post_model_list_view, name="list"),
    path('/<int:id>/', post_model_detailed_view, name="detailed"),
    path('/bitch', basic_ass_buitch, name="bitch"),


]