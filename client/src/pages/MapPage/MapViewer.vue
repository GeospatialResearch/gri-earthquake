<template>
  <!-- Provides a canvas to render the Harp.GL map -->
  <div>
    <div id="cesiumContainer" class="full-screen"></div>
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
    this.viewer = new Cesium.Viewer("cesiumContainer");
  }

}
</script>

<style scoped>
/* Renders the canvas below other objects and full screen */
div.full-screen >>> canvas {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
