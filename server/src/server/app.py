import logging
import os
from itertools import count

import geopandas
import pandas as pd
import requests
from dotenv import load_dotenv
from flask import Flask
from flask import request
from flask_cors import CORS
from geoapis.vector import Linz

app = Flask(__name__)

# Set up Cross-Origin policy
CORS(app, origins=["http://localhost:8080", "http://gri1p.linux.canterbury.ac.nz"])

# Load environment variables
load_dotenv()

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


@app.route('/buildings')
def buildings_layer():
    """Requests building layer data"""
    kaiapoi_d = {
        "wkt": ["POLYGON ((1570792 5196184, 1570730 5195134, 1572337 5195117, 1572264 5196045, 1570792 5196184))"]}
    df = pd.DataFrame(kaiapoi_d)
    gs = geopandas.GeoSeries.from_wkt(df['wkt'])
    kaiapoi_gdf = geopandas.GeoDataFrame(df, geometry=gs, crs="epsg:2193")
    linz = Linz(key=os.getenv("LINZ_KEY"), bounding_polygon=kaiapoi_gdf, verbose=True)
    building_gdf = linz.run(101290).to_crs(4284)
    building_gdf.to_file("buildings.geojson", driver='GeoJSON')
    return "Success"


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
