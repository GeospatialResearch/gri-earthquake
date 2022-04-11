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
      })
    });
    this.viewer.camera.flyTo({destination: new Cesium.Cartesian3(-4612759.797689467, 593822.8330716471, -4365380.44925229)});
    this.addDataSources();
  },

  methods: {
    async addDataSources() {
      const buildingDataSource = await Cesium.GeoJsonDataSource.load(
          "kaiapoi_apr.geojson", {
            stroke: Cesium.Color.HOTPINK,
            fill: Cesium.Color.PINK.withAlpha(0.5),
            strokeWidth: 3,
          });
      this.viewer.dataSources.add(buildingDataSource);
      for (const buildingEntity of buildingDataSource.entities.values) {
        buildingEntity.polygon.extrudedHeight = 4;
      }
      this.viewer.imageryLayers.addImageryProvider(
          new Cesium.IonImageryProvider({assetId: 918127})
      );

    }
  }

}
</script>

<style scoped>
@import url(/Widgets/widgets.css);
</style>
