import logging
from itertools import count

import requests
from flask import Flask
from flask import request
from flask_cors import CORS

app = Flask(__name__)

# Set up Cross-Origin policy
CORS(app, origins=["http://localhost:8080", "http://gri1p.linux.canterbury.ac.nz:80"])

# Production server
if __name__ != '__main__':
    # Set gunicorn loggers to work with flask
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)


@app.route('/earthquakes')
def earthquakes():
    """Requests earthquake data and flattens to a simplified JSON format"""
    app.logger.info(request.headers['Origin'])
    eq_data = make_earthquake_request(request.args)
    filtered_data = filtered_earthquake_data(eq_data)
    return filtered_data


def make_earthquake_request(payload):
    """Requests GeoJSON data from Geonet for all earthquakes in the specified ranges provided by payload"""
    payload_with_bbox = dict([("bbox", "164,-49,180,-32")], **payload)  # Provides default value for bbox
    return requests.get("https://quakesearch.geonet.org.nz/geojson", params=payload_with_bbox).json()


def filtered_earthquake_data(eq_data):
    """Flattens and simplifies earthquake GeoJSON to a very simplified format"""

    def json_filter(feature):
        props = feature['properties']
        geom = feature['geometry']
        return {
            'index': next(counter),
            'publicid': props['publicid'],
            'origintime': props['origintime'],
            'latitude': geom['coordinates'][0],
            'longitude': geom['coordinates'][1],
            'magnitude': props['magnitude'],
            'depth': props['depth']
        }

    counter = count(start=1)
    features = eq_data['features']
    filtered_features = list(map(json_filter, features))
    return {'earthquakes': filtered_features}


# Development server
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

# Production server
if __name__ != '__main__':
    # Set gunicorn loggers to work with flask
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)
