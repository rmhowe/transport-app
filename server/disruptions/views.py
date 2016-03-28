from django.core.serializers import serialize
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest

from .models import Disruption, MetroLine

def access_all(request):
    if request.method == 'GET':
        return get_all_disruptions()
    elif request.method == 'POST':
        return create_disruption(request)
    else:
        return HttpResponseBadRequest()

def access_one(request, disruption_id):
    if request.method == 'GET':
        return get_disruption(disruption_id)
    elif request.method == 'DELETE':
        return delete_disruption(disruption_id)
    else:
        return HttpResponseBadRequest()

def get_all_disruptions():
    all_disruptions = list(Disruption.objects.values())
    return JsonResponse(dict(data=all_disruptions))

def create_disruption(request):
    response = "It appears you would like to CREATE a disruption notice"
    return HttpResponse(response)

def get_disruption(disruption_id):
    disruption = Disruption.objects.get(id=disruption_id)
    return JsonResponse(disruption.to_json())

def delete_disruption(disruption_id):
    response = "It appears you would like to DELETE disruption notice with id %s"
    return HttpResponse(response % disruption_id)
