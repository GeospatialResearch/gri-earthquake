<template>
  <!-- Provides a canvas to render the Harp.GL map -->
  <div>
    <canvas ref="map" style="width: 100vw; height: 100vh"></canvas>
  </div>
</template>

<script>
import GeoJSON from "geojson";
import {MapView} from "@here/harp-mapview";
import {MapControls, MapControlsUI} from "@here/harp-map-controls"
import {APIFormat, GeoJsonDataProvider} from "@here/harp-vectortile-datasource";
import {OmvDataSource} from "@here/harp-omv-datasource";
import {GeoCoordinates} from "@here/harp-geoutils";

export default {
  name: "MapViewer",
  props: {
    /** The HERE XYZ access token */
    token: String,
    /** Initial latitude */
    lat: [String, Number],
    /** Initial longitude */
    lng: [String, Number],
  },

  data() {
    return {
      /** Styles for map */
      customisedTheme: {
        extends: "https://unpkg.com/@here/harp-map-theme@latest/resources/berlin_tilezen_effects_streets.json",

        styles: {
          markerStyleSet: [{
            when: "$geometryType == 'point'",
            technique: "circles",
            renderOrder: 1,
            attr: {
              color: "#7ED321",
              size: 15
            }
          },
          ]
        },

      },

    }
  },

  mounted() {
    // Create map and controls
    this.map = new MapView({
      canvas: this.$refs.map,
      theme: this.customisedTheme,
    });
    const controls = new MapControls(this.map);
    const ui = new MapControlsUI(controls, {projectionSwitch: true});
    this.$refs.map.parentElement.appendChild(ui.domElement);

    // Retrieve tiled base map
    if (this.token) {
      const omvDataSource = new OmvDataSource({
        baseUrl: "https://xyz.api.here.com/tiles/herebase.02",
        apiFormat: APIFormat.XYZOMV,
        styleSetName: "tilezen",
        authenticationCode: this.token,
      });
      this.map.addDataSource(omvDataSource);
    } else {
      console.error(`Invalid HERE XYZ token: ${this.token}. Make sure you have a VUE_APP_HEREAPI environment variable set. Check the README for more info`);
    }

    this.map.lookAt({
      target: new GeoCoordinates(Number(this.lat), Number(this.lng)),
      zoomLevel: 12
    });

    this.dropPoints("example-points", [
      {lat: 37.7497, lng: -121.4252},
      {lat: 37.7597, lng: -121.4352},
      {lat: -43.523392915353384, lng: 172.58414599255107}
    ]);
  },

  methods: {
    /** Convert array of positions into GeoJSON Points */
    createPoints(positions) {
      return GeoJSON.parse(positions, {Point: ["lat", "lng"]});
    },

    /** Add markers to maps at each position */
    dropPoints(name, positions) {
      const geoJsonDataProvider = new GeoJsonDataProvider(name, this.createPoints(positions));
      const geoJsonDataSource = new OmvDataSource({
        dataProvider: geoJsonDataProvider,
        name: name,
        styleSetName: "markerStyleSet"
      });
      this.map.addDataSource(geoJsonDataSource);
    }
  }
}
</script>

<style scoped>

</style>
