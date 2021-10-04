import unittest
from datetime import datetime, timedelta

from server.app import make_earthquake_request


class TestEarthquakesRequest(unittest.TestCase):
    def test_start_date_after_end_date(self):
        payload = {"startdate": "2021-10-03",
                   "enddate": "2021-10-01"}
        response = make_earthquake_request(payload)
        self.assertEqual(len(response["features"]), 0, "Expected features list to be empty")

    def test_start_date_same_as_end_date(self):
        payload = {"startdate": "2021-10-01",
                   "enddate": "2021-10-01"}
        response = make_earthquake_request(payload)
        self.assertEqual(len(response["features"]), 0, "Expected features list to be empty")

    def test_empty_end_date(self):
        """Tests all earthquakes for the last 31 days"""
        today = datetime.now()
        last_month = today - timedelta(days=31)  # 31 days ago
        start_time = str(last_month)
        start_date = start_time.split(" ")[0]

        payload = {"startdate": start_date}
        response = make_earthquake_request(payload)
        self.assertGreater(len(response["features"]), 0, "No features found in the last 31 days")


if __name__ == "__main__":
    unittest.main()
