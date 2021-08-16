import axios from "axios";

// Requests to be sent to external APIs to get data

const API_URL = process.env.VUE_APP_EARTHQUAKE_API

/**
 * Retrieves all earthquakes between startDate and endDate from external API
 * @param {string} startDate Earthquakes on this date or after. YYYY-MM-DD format
 * @param {string} endDate Earthquakes before this date. YYYY-MM-DD format
 * @returns {Promise<[Earthquake]>} Array containing all earthquakes in the specified range
 */
export async function getEarthquakes(startDate, endDate) {
  try {
    const response = await axios.get(`${API_URL}/earthquakes`, {params: {startdate: startDate, enddate: endDate}});
    return response.data.earthquakes
  } catch (e) {
    console.error(e)
  }
}
