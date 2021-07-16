<template>
<!-- Root component for the app -->
  <div id="app">
    <AppNavBar />
    <div class="container-fluid">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppNavBar from "@/components/AppNavBar";

export default {
  name: 'App',
  components: {
    AppNavBar,
  },
  created() {
    // On creation of app initialise VueX store with data from necessary external APIs
    this.$store.dispatch('updateEarthquakes')
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
