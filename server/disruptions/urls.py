from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.access_all, name='access_all'),
    url(r'^(?P<disruption_id>[0-9]+)', views.access_one, name='access_one'),
]
