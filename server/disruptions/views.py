from django.core.serializers import serialize
from django.http import HttpResponse, JsonResponse, Http404
from django.shortcuts import get_object_or_404

from .models import Disruption, MetroLine

import json

def access_all(request):
    if request.method == 'GET':
        return get_all_disruptions()
    elif request.method == 'POST':
        return create_disruption(request)
    else:
        return HttpResponseBadRequest(status=400)

def access_one(request, disruption_id):
    if request.method == 'GET':
        return get_disruption(disruption_id)
    elif request.method == 'DELETE':
        return delete_disruption(disruption_id)
    else:
        return HttpResponse(status=400)

def get_all_disruptions():
    all_disruptions = [d.to_dict() for d in Disruption.objects.all()]
    return JsonResponse(dict(data=all_disruptions))

def create_disruption(request):
    disruption = json.loads(request.body.decode())
    try:
        Disruption.objects.create(
            metro_line=MetroLine.objects.get(line_number=disruption["line_number"]),
            start_time=disruption["start_time"],
            end_time=disruption["end_time"],
            disruption_title=disruption["disruption_title"],
            disruption_text=disruption["disruption_text"]
        )
        return HttpResponse(status=201)
    except Error:
        return HttpResponse(status=500)

def get_disruption(disruption_id):
    disruption = get_object_or_404(Disruption, id=disruption_id)
    return JsonResponse(disruption.to_dict())

def delete_disruption(disruption_id):
    try:
        disruption = Disruption.objects.get(id=disruption_id)
        disruption.delete()
        return HttpResponse(status=204)
    except Disruption.DoesNotExist:
        return Http404("Specified disruption does not exist")
    except Error:
        return HttpResponse(status=500)
