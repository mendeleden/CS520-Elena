from django.shortcuts import render
from rest_framework import viewsets          # fourth phase
from .serializers import TodoSerializer      # fourth phase
from .models import Todo                     # fourth phase

# Create your views here.
class TodoView(viewsets.ModelViewSet):       # fourth phase
    serializer_class = TodoSerializer        # fourth phase
    queryset = Todo.objects.all()            # fourth phase
