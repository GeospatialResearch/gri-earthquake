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
    this.viewer = new Cesium.Viewer("cesiumContainer");
    this.viewer.camera.flyTo({destination: new Cesium.Cartesian3(-4612759.797689467, 593822.8330716471, -4365380.44925229)});
    this.addDataSources();
  },

  methods: {
    async addDataSources() {
      const nonFloodBuildingDS = await Cesium.GeoJsonDataSource.load(
          "non_flood_reproj.geojson", {
            stroke: Cesium.Color.FORESTGREEN,
            fill: Cesium.Color.DARKGREEN,
            strokeWidth: 3,
          });
      this.viewer.dataSources.add(nonFloodBuildingDS);
      const floodBuildingDS = await Cesium.GeoJsonDataSource.load(
          "flooded_reproj.geojson", {
            stroke: Cesium.Color.RED,
            fill: Cesium.Color.DARKRED,
            strokeWidth: 3,
          });
      this.viewer.dataSources.add(floodBuildingDS);

      const allBuildings = nonFloodBuildingDS.entities.values.concat(floodBuildingDS.entities.values);
      for (const buildingEntity of allBuildings) {
        buildingEntity.polygon.extrudedHeight = 4;
      }
      this.viewer.imageryLayers.addImageryProvider(
          new Cesium.IonImageryProvider({assetId: 946761})
      );

    }
  }

}
</script>

<style scoped>
@import url(/Widgets/widgets.css);
</style>
