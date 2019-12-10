#!/bin/bash

echo "Installing Django"
pip install django
echo "Installing Cors"
pip install djangorestframework django-cors-headers
pip install django-cors-middleware
echo "Starting Server"
cd osmbackend
python manage.py runserver 0.0.0.0:8000