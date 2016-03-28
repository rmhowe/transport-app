from django.contrib import admin

from .models import Disruption, MetroLine

admin.site.register(Disruption)
admin.site.register(MetroLine)
