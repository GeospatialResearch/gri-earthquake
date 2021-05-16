import requests
from flask import Flask
from flask import request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:8080"])


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/earthquakes')
def earthquakes():
    eq_data = make_earthquake_request(request.args)
    return eq_data


def make_earthquake_request(payload):
    payload_with_bbox = dict([("bbox", "164,-49,180,-32")], **payload)  # Provides default value for bbox
    return requests.get("https://quakesearch.geonet.org.nz/geojson", params=payload_with_bbox).json()


if __name__ == '__main__':
    app.run()
