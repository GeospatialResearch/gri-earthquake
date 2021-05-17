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
    filtered_data = filtered_earthquake_data(eq_data)
    return filtered_data


def make_earthquake_request(payload):
    payload_with_bbox = dict([("bbox", "164,-49,180,-32")], **payload)  # Provides default value for bbox
    return requests.get("https://quakesearch.geonet.org.nz/geojson", params=payload_with_bbox).json()


def filtered_earthquake_data(eq_data):
    def json_filter(feature):
        props = feature['properties']
        geom = feature['geometry']
        return {
            'publicid': props['publicid'],
            'coordinates': geom['coordinates'],
            'magnitude': props['magnitude'],
            'depth': props['depth']
        }

    features = eq_data['features']
    filtered_features = list(map(json_filter, features))
    return {'earthquakes': filtered_features}


if __name__ == '__main__':
    app.run()
