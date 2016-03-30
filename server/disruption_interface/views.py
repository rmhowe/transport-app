from django.shortcuts import render

def index(request):
    return render(request, 'disruption_interface/index.html')
