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
import {APIFormat, GeoJsonDataProvider, VectorTileDataSource} from "@here/harp-vectortile-datasource";
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
      /** Data source for all earthquake points on the map */
      earthquakeDataSource: null,
      buildingDataSource: null,

      /** Styles for map */
      customisedTheme: {
        extends: "theme/berlin_tilezen_night_reduced.json",

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
          ],
          geojson: [{
            "when": [
              "==", ["geometry-type"], "Polygon"
            ],
            "technique": "extruded-polygon",
            "opacity": 1,
            "height": 3,
            renderOrder: 1000,
            "color": "#cc720c",
          }]
        },
      }

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
        this.getBuildingOutlines()
      } else {
        console.error(`Invalid HERE XYZ token: ${this.token}. Make sure you have a VUE_APP_HEREAPI environment variable set. Check the README for more info`);
      }
    },

    addEarthquakePoints() {
      // if (!this.loadingStatus) {
      //   if (this.earthquakeDataSource) {
      //     this.map.removeDataSource(this.earthquakeDataSource);
      //   }
      //   this.dropPoints('earthquakes', this.earthquakes);
      // }
    },


    /** Convert array of positions into GeoJSON Points */
    createPoints(positions) {
      return GeoJSON.parse(positions, {Point: ["longitude", "latitude"]});
    },

    async getBuildingOutlines() {
      const res = await fetch("buildings_good.geojson");
      const data = await res.json();
      const dataProvider = new GeoJsonDataProvider("building-outlines", data);
      const buildingDataSource = new VectorTileDataSource({
        dataProvider,
        name: "building-outlines",
        styleSetName: "geojson",
      });
      buildingDataSource
      this.map.addDataSource(buildingDataSource);
      console.log("yeet")
    },


    /** Add markers to maps at each position */
    dropPoints(name, positions) {
      const geoJsonDataProvider = new GeoJsonDataProvider(name, this.createPoints(positions));
      this.earthquakeDataSource = new OmvDataSource({
        dataProvider: geoJsonDataProvider,
        name: name,
        styleSetName: "markerStyleSet"
      });
      this.map.addDataSource(this.earthquakeDataSource);
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
