import logging

from flask import Flask
from flask import request
from flask_cors import CORS

from server.earthquakes import make_earthquake_request, filtered_earthquake_data

app = Flask(__name__)

# Set up Cross-Origin policy
CORS(app, origins=["http://localhost:8080", "http://gri1p.linux.canterbury.ac.nz"])

# Production server
if __name__ != '__main__':
    # Set gunicorn loggers to work with flask
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)


@app.route('/earthquakes')
def earthquakes():
    """Requests earthquake data and flattens to a simplified JSON format"""
    eq_data = make_earthquake_request(request.args)
    filtered_data = filtered_earthquake_data(eq_data)
    return filtered_data


# Development server
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

# Production server
if __name__ != '__main__':
    # Set gunicorn loggers to work with flask
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)
