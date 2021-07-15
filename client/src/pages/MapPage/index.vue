<template>
  <div>
    <MapViewer
        :token="hereApiToken"
        lat="-43.523392915353384"
        lng="172.58414599255107"
    />
    <range-selector/>
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
    ...mapState([
      'earthquakes',
      'startDate',
      'endDate'
    ])
  },

  methods: {}
}
</script>

<style scoped>

</style>