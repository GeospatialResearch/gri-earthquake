import requests
from flask import Flask
from flask import request

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/earthquakes')
def earthquakes():
    eq_data = make_earthquake_request(request.args)
    return eq_data


def make_earthquake_request(payload):
    return requests.get("https://quakesearch.geonet.org.nz/geojson", params=payload).json()


if __name__ == '__main__':
    app.run()
