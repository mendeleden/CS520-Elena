###################################
# doing udemy course here
###################################
from django.http import HttpResponse
from django.http import HttpResponseRedirect

import numpy as np
# def home(request):
#     print(request.get_full_path())
#     x = np.random.randint(10, size=3)
#     print(x)
#     return HttpResponse("<h1> Hello world </h1>")
def home(request):
    response = HttpResponse()
    response.write("<p> Some text for the page </p>")
    return response

def redirect_somewhere(request):
    return HttpResponseRedirect('some/path')