<template>
<div class="container-fluid">
  <h3>NZ Earthquake viewer</h3>
  <p>This is a Vue.js/Flask app which demonstrates web queries to map and plot New Zealand earthquakes which were recorded by <a href="https://api.geonet.org.nz">GeoNet</a>.</p>
  <p>&nbsp;</p>
  <hr/>
  <h4>Data providers</h4>
  <p>All data presented are copyright of the respective owners and they are gratefully acknowledged:</p>
  <ul>
    <li>Earthquake data: <a href="https://api.geonet.org.nz">GeoNet</a>. Data license: <a href="http://creativecommons.org/licenses/by/3.0/nz">Creative Commons Attribution 3.0 New Zealand</a>. Copyright <a href="https://www.gns.cri.nz">GNS Science</a>.</li>
    <li>Active fault data: <a href="https://data.gns.cri.nz/af">GNS Science</a>, as detailed in <a href="https://dx.doi.org/10.1080/00288306.2015.1112818">Langridge et al. (2016)</a>. The data were obtained in August 2020 and have a scale of 1:250,000: they should not be used at larger scales.</li>
  </ul>
  <hr/>
  <h4>Source code</h4>
  <p>The source code for the app <a href="https://gitlab.com/lukelpparkinson/gri-earthquake">can be obtained from GitLab here</a>.</p>
  <hr/>
  <h4>Version history</h4>
  <ul>
    <li>0.1   : 2021-05-14: Initial alpha release</li>
  </ul>
  <hr/>
  <h4>App licence</h4>
  <p>&#169; Copyright 2020 Matt Wilson/Geospatial Research Institute Toi Hangarau</p>
  <p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>
  <p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>
  <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>

</div>
</template>

<script>
export default {
  name: "AboutPage"
}
</script>

<style scoped>


</style>