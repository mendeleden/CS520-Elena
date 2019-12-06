#!/bin/bash

echo "Installing Django"
pip install django
pip install djangorestframework django-cors-headers
echo "Starting Server"
cd osmbackend
python manage.py runserver 0.0.0.0:8000