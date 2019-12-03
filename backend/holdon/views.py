from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpRequest, Http404, HttpResponseRedirect
from django.contrib.auth.decorators import login_required
# Create your views here.

from .models import PostModel


def basic_ass_buitch(request):
    return HttpResponse("<h1> Bitch </h1>")

def post_model_list_view(request):
    qs = PostModel.objects.all()
    # print(request.user.is_authenticated)
    if request.user.is_authenticated:
        print("User is logged in ", request.user)
    else:
        print("User is NOT logged in ", request.user)
    
    template_path ="list_view.html" 
    print(qs)
    context_dic = {
        "object_list" : qs,
        "another_dic" : { "hard_coded" : "value"},
        "array_list" : [1,2,3,4,999]
    }
    return render(request, template_path, context_dic)

def post_model_detailed_view(request, id=None):
    # obj = PostModel.objects.get(id=1)  #might fail if object doesnt exit
    obj = get_object_or_404(PostModel, id=id) #sends a 404 page error if object doesn't exist
    # # third optio n
    # try : 
    #     obj = PostModel.objects.get(id=1)
    # except:
    #     raise Http404
    # Fourth option
    # qs = PostModel.objects.filter(id=100)
    # print(qs, len(qs))

    # if len(qs) == 0:
    #     raise Http404
    # else:
    #     obj = qs.first()

    template_path ="detailed_view.html" 
    print(obj)
    context_dic = {
        "object" : obj,
    }
    return render(request, template_path, context_dic)


@login_required(login_url='/login')
def login_protected_post_model_list_view(request):
    if request.user.is_authenticated:
        print("User is logged in ", request.user)
        template_path ="list_view.html"
    else:
        print("User is NOT logged in ", request.user)
        template_path ="list_view_public.html"
        # raise Http404
        HttpResponseRedirect("/login")

    qs = PostModel.objects.all() 
    print(qs)
    context_dic = {
        "object_list" : qs,
        "another_dic" : { "hard_coded" : "value"},
        "array_list" : [1,2,3,4,999]
    }
    return render(request, template_path, context_dic)