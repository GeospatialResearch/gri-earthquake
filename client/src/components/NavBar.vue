<template>
  <div class="navbar navbar-default navbar-static-top" role="navigation">
    <div class="navbar-header">
      <span class="navbar-brand">NZ Earthquake viewer</span>
    </div>
    <ul class="nav navbar-nav">
      <li :class="{ active: this.$route.name === 'Map' }">
        <router-link :to="{name: 'Map'}">Map</router-link>
      </li>
      <li :class="{ active: this.$route.name === 'DataTable' }">
        <router-link :to="{name: 'DataTable'}">Data table</router-link>
      </li>
      <li :class="{ active: this.$route.name === 'Plots' }">
        <router-link :to="{name: 'Plots'}">Plots</router-link>
      </li>
      <li :class="{ active: this.$route.name === 'About' }">
        <router-link :to="{name: 'About'}">About</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NavBar",

  methods: {
    // isActiveItem: function (routeName) {
    //   this.$route
    // }
  }
}
</script>

<style scoped>
/*.navbar-nav>li>a.router-link-exact-active {*/
/*  color: #555;*/
/*  background-color: #e7e7e7;*/
/*}*/
/*.nav>a.router-link-exact-active {*/
/*  color: red;*/
/*}*/

/*.navbar-nav li {*/
/*  float: left;*/
/*}*/

/*.nav li {*/
/*  position: relative;*/
/*  display: block;*/
/*}*/

/*.navbar-default .navbar-nav li > a {*/
/*  color: #777;*/
/*}*/

/*.navbar-nav li>a {*/
/*  padding-top: 10px;*/
/*  padding-bottom: 10px;*/
/*  line-height: 20px;*/
/*}*/

/*.nav li>a {*/
/*  position: relative;*/
/*  display: block;*/
/*  padding: 15px 15px;*/
/*}*/
</style>