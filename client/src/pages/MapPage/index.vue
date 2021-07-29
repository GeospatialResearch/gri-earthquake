<template>
  <!-- Page for the map and any controls relevant to it -->
  <div>
    <MapViewer
        class="full-screen-map"
        :token="hereApiToken"
        lat="-43.523392915353384"
        lng="172.58414599255107"
    />
    <RangeSelector id="range-selector" class="bg-white" />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import RangeSelector from "./RangeSelector";
import MapViewer from "./MapViewer";

export default {
  name: "MapPage",
  title: "Map",

  components: {MapViewer, RangeSelector},
  data: function () {
    return {
      hereApiToken: process.env.VUE_APP_HEREAPI
    }
  },

  computed: {
    // Map store access: this.$store.state.X -> this.X
    ...mapState([
      'startDate',
      'endDate'
    ])
  },

  methods: {}
}
</script>

<style scoped>
#range-selector {
  position: absolute;
  bottom: 15px;
  left: 15px;
}
</style>
