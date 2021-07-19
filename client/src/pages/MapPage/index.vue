<template>
<!-- Page for the map and any controls relevant to it -->
  <div>
    <MapViewer
        :token="hereApiToken"
        lat="-43.523392915353384"
        lng="172.58414599255107"
    />
    <RangeSelector/>
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