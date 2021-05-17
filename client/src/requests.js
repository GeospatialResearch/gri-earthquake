import axios from "axios";

const PORT_NUMBER = 5000;
const API_URL = `http://localhost:${PORT_NUMBER}`;

export async function getEarthquakes(startDate, endDate) {
  try {
    const response = await axios.get(`${API_URL}/earthquakes`, {params: {startdate: startDate, enddate: endDate}});
    return response.data.earthquakes
  } catch (e) {
    console.error(e)
  }
}
