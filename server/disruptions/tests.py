from django.test import TestCase, Client
from disruptions.models import Disruption, MetroLine

class EndPointTestCase(TestCase):
    def setUp(self):
        MetroLine.objects.create(line_number="1", line_name="Yonge-University")
        MetroLine.objects.create(line_number="2", line_name="Bloor-Danforth")
        MetroLine.objects.create(line_number="3", line_name="Scarborough")
        MetroLine.objects.create(line_number="4", line_name="Sheppard")
        Disruption.objects.create(metro_line=MetroLine.objects.get(id=3), start_time="2015-03-29T10:00:00Z", end_time="2017-03-29T10:00:00Z", disruption_title="Bananas", disruption_text="A severe banana storm has cut off all metro lines")
        Disruption.objects.create(metro_line=MetroLine.objects.get(id=1), start_time="2015-03-29T09:00:00Z", end_time="2017-03-29T10:00:00Z", disruption_title="Bleep", disruption_text="Bloop")


    def test_get_all(self):
        client = Client()
        response = client.get('/disruptions/')
        disruptions = response.json()
        self.assertEqual(len(disruptions['data']), 2)
        self.assertEqual(disruptions['data'][1]['line_number'], '1')
        self.assertEqual(disruptions['data'][1]['start_time'], '2015-03-29T09:00:00Z')


    def test_get_one(self):
        client = Client()
        response = client.get('/disruptions/1')
        disruption = response.json()
        self.assertEqual(disruption['disruption_title'], 'Bananas')
        self.assertEqual(disruption['line_number'], '3')


    def test_get_one_fail(self):
        client = Client()
        response = client.get('/disruptions/6')
        self.assertEqual(response.status_code, 404)


    def test_create(self):
        client = Client()
        response = client.post('/disruptions/', data='''{
        	"line_number": "1",
        	"disruption_title": "Hello this is dog",
            "disruption_text": "Urgent dog repairs",
        	"start_time": "2016-03-29T10:00:00Z"
        }''', content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(len(Disruption.objects.all()), 3)
        disruption = Disruption.objects.get(id=3)
        self.assertEqual(disruption.metro_line, MetroLine.objects.get(line_number=1))
        self.assertEqual(disruption.disruption_text, 'Urgent dog repairs')


    def test_create_fail(self):
        client = Client()
        response = client.post('/disruptions/', data='''{
        	"line_number": "1",
        	"disruption_title": "Hello this is dog",
            "disruption_text": "Urgent dog repairs",
            "end_time": "2016-03-29T12:00:00Z"
        }''', content_type='application/json')
        self.assertEqual(response.status_code, 400)


    def test_delete(self):
        client = Client()
        response = client.delete('/disruptions/1')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(Disruption.objects.all()), 1)


    def test_delete_fail(self):
        client = Client()
        response = client.delete('/disruptions/5')
        self.assertEqual(response.status_code, 404)
