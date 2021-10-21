from itertools import count

import requests


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
