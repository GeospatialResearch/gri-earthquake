from datetime import datetime, timedelta
from typing import Optional

import pytest

from server.app import app


@pytest.fixture
def client():
    with app.test_client() as client:
        yield client


def get_earthquakes(client, start_date: Optional[str] = None, end_date: Optional[str] = None):
    """Helper function to send requests to retrieve earthquakes"""
    payload = dict()
    if start_date:
        payload["startdate"] = start_date
    if end_date:
        payload["enddate"] = end_date

    return client.get('/earthquakes', query_string=payload)


def test_no_start_date(client):
    resp = get_earthquakes(client, end_date="2021-10-05")
    assert b'No start date supplied' in resp.data
    assert resp.status_code == 400


def test_no_end_date(client):
    """Finds all earthquakes for the last 31 days, some should be found"""
    today = datetime.now()
    last_month = today - timedelta(days=31)  # 31 days ago
    start_time = str(last_month)
    start_date = start_time.split(" ")[0]

    resp = get_earthquakes(client, start_date)
    assert len(resp.json["earthquakes"]) > 0
    assert resp.status_code == 200


def test_start_date_same_as_end_date(client):
    date = "2021-10-05"
    resp = get_earthquakes(client, start_date=date, end_date=date)
    assert b'Start date must be before end date' in resp.data
    assert resp.status_code == 400


def start_date_after_end_date(client):
    resp = get_earthquakes(client, start_date="2021-10-05", end_date="2021-10-01")
    assert b'Start date must be before end date' in resp.data
    assert resp.status_code == 400
