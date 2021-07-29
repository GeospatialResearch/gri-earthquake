<template>
  <!-- Provides a canvas to render the Harp.GL map -->
  <div>
    <canvas ref="map"></canvas>
  </div>
</template>

<script>
import GeoJSON from "geojson";
import {MapView} from "@here/harp-mapview";
import {MapControls, MapControlsUI} from "@here/harp-map-controls"
import {APIFormat, GeoJsonDataProvider} from "@here/harp-vectortile-datasource";
import {OmvDataSource} from "@here/harp-omv-datasource";
import {GeoCoordinates} from "@here/harp-geoutils";
import {mapState} from "vuex";

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
            renderOrder: 1000, // Render the markers above other objects on the map
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

  computed: {
    // Map store access: this.$store.state.X -> this.X
    ...mapState([
      'earthquakes',
      'loadingStatus'
    ]),
  },

  mounted() {
    this.initialiseMapCanvas();
    this.initaliseBaseDataSources();

    this.map.lookAt({
      target: new GeoCoordinates(Number(this.lat), Number(this.lng)),
      zoomLevel: 12
    });

    this.addEarthquakePoints();
  },

  watch: {
    loadingStatus: function (newLoadingStatus) {
      if (!newLoadingStatus) {
        this.addEarthquakePoints();
      }
    }
  },

  methods: {
    /** Adds the map and control elements to the page, ready for a data source*/
    initialiseMapCanvas() {
      this.map = new MapView({
        canvas: this.$refs.map,
        theme: this.customisedTheme,
      });

      // Add control buttons to map
      const controls = new MapControls(this.map);
      const ui = new MapControlsUI(controls, {projectionSwitch: true});
      this.$refs.map.parentElement.appendChild(ui.domElement);

      // Make map fullscreen
      this.map.resize(window.innerWidth, window.innerHeight);

      // Make map sizing responsive to window size
      window.addEventListener("resize", () => {
        this.map.resize(window.innerWidth, window.innerHeight);
      });
    },

    /** Adds terrain, street, building, etc. data sources to the map */
    initaliseBaseDataSources() {
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
    },

    addEarthquakePoints() {
      if (!this.loadingStatus) {
        this.dropPoints('earthquakes', this.earthquakes);
      }
    },

    /** Convert array of positions into GeoJSON Points */
    createPoints(positions) {
      return GeoJSON.parse(positions, {Point: ["longitude", "latitude"]});
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
/* Renders the canvas below other objects and full screen */
div.full-screen-map > canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
