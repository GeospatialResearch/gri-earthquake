<template>
  <!-- Provides a canvas to render the Harp.GL map -->
  <div>
    <div id="cesiumContainer" class="fullSize"></div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import * as Cesium from "cesium";

export default {
  name: "MapViewer",
  props: {
    /** Initial latitude */
    lat: [String, Number],
    /** Initial longitude */
    lng: [String, Number],
  },

  data() {
    return {
      viewer: null
    }
  },

  computed: {
    // Map store access: this.$store.state.X -> this.X
    ...mapState([
      'earthquakes',
      'loadingStatus'
    ]),
  },

  mounted() {
    this.viewer = new Cesium.Viewer("cesiumContainer", {
      imageryProvider: new Cesium.OpenStreetMapImageryProvider({
        url: 'https://stamen-tiles.a.ssl.fastly.net/toner-lite/',
        fileExtension: 'png',
        credit: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.'
      }),
      terrainProvider: Cesium.createWorldTerrain({requestWaterMask: false})
    });
    this.viewer.camera.flyTo({destination: new Cesium.Cartesian3(-4612759.797689467, 593822.8330716471, -4365380.44925229)});

  }

}
</script>

<style scoped>
@import url(/Widgets/widgets.css);
</style>
