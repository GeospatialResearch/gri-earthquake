<template>
  <div>
    <h1>Map Page :)))</h1>
    <div>
      {{ earthquakes }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {API_URL} from "@/requests";

export default {
  name: "MapPage",

  data: function () {
    return {
      earthquakes: null,
      startDate: "2021-05-01",
      endDate: "2021-05-02",
    }
  },

  created: function () {
    this.fetchEarthquakes();
  },

  methods: {
    fetchEarthquakes: function () {
      axios.get(`${API_URL}/earthquakes`, {params: {startdate: this.startDate, enddate: this.endDate, bbox: "164,-49,180,-32"}})
          .then(response => {
            this.earthquakes = response.data.features
          })
          .catch(error => {
            console.error(error)
          });
    }
  }
}
</script>

<style scoped>

</style>