<template>
  <!-- Page for the map and any controls relevant to it -->
  <div>
    <MapViewer
        class="full-screen-map"
        :token="hereApiToken"
        lat="-43.523392915353384"
        lng="172.58414599255107"
    />
    <RangeSelector id="range-selector" />
  </div>
</template>

<script>
import RangeSelector from "./RangeSelector";
import MapViewer from "./MapViewer";
import {RESET_DATES} from "@/store/mutation-types";

export default {
  name: "MapPage",
  title: "Map",

  components: {MapViewer, RangeSelector},
  data: function () {
    return {
      hereApiToken: process.env.VUE_APP_HEREAPI
    }
  },

  created() {
    // Reset the dates whenever the user returns to the page
    this.$store.commit(RESET_DATES);
  },
}
</script>

<style scoped>
#range-selector {
  position: absolute;
  bottom: 15px;
  left: 15px;
}
</style>
