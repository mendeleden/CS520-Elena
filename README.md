# CS520-Elena
EleNa Final Project for CS 520 - Fall 2019
by: Temma, Eden, Danny, Janja

# Resources

DjangoRest Documenation: https://www.django-rest-framework.org/
    -Models
    -Seralizers

React Documenation: https://reactjs.org/docs/react-component.html

OPS Wiki: https://wiki.openstreetmap.org/wiki/Main_Page

Debug pipenv: https://github.com/pypa/pipenv/issues/3671



# Installing dependencies

Python3.7.3: https://www.python.org/downloads/release/python-373/
    ***You must have Python3.7.3***

Pip3: Should come with Python3
    Run `pip3` to check you have pip installed

PipEnv: `pip install pipenv`

VSCode Extension : (Search Python in Extension Marketplace)
https://marketplace.visualstudio.com/items?itemName=ms-python.python

    -Then press Ctrl-Shift-P and search Python Select Interpreter
    -Select the appropriate pipenv

VSCode will then recommend installing Pylint (which will help with autocompletion)


# Running server

From the root run `npm install` to install frontend dependencies

Then run `npm run dev`

Open a new terminal window to run the django server
    (Researching a way to run both commands concurrently...)

From the Root Directory run `pipenv shell` which will setup the virtual environment

Then run `pipenv install` to install backend dependencies 

cd into ElenaProj and run `python manage.py runserver`

It should then start the dev server which you can access at http://127.0.0.1:8000/



