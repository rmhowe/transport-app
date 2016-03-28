from __future__ import unicode_literals

from django.db import models
from django.utils import timezone

class MetroLine(models.Model):
    line_number = models.CharField(max_length=10)
    line_name = models.CharField(max_length=100)

    def __str__(self):
        return self.line_name

class Disruption(models.Model):
    metro_line = models.ForeignKey(MetroLine, on_delete=models.CASCADE)
    created = models.DateTimeField(default=timezone.now)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    disruption_title = models.CharField(max_length=200)
    disruption_text = models.TextField()

    def __str__(self):
        return self.disruption_title

    def to_json(self):
        return {
            "created": self.created,
            "start_time": self.start_time,
            "end_time": self.end_time,
            "disruption_title": self.disruption_title,
            "disruption_text": self.disruption_text,
            "line_number": self.metro_line.line_number,
            "line_name": self.metro_line.line_name
        }
