<template>
  <div id="range-selector" class="card">
    <div>
      <div class="form-group">
        <label id="daterange-label" class="control-label" for="daterange"><h4>Date range:</h4></label>
        <div class="input-group input-group-sm">
          <input aria-labelledby="daterange-label" class="form-control" type="text">
          <span class="input-group-addon"><span class="input-group-text"> to </span></span>
          <input aria-labelledby="daterange-label" class="form-control" type="text">
        </div>
      </div>
      <div class="form-group">
        <label id="quickselect-label" class="control-label" for="quickselect-selectized">Quick select</label>
      </div>
      <button class="btn btn-default action-button">Load</button>
      <hr />
      <div class="form-group">
        <label id="magnitudeSlider-label" class="control-label"><h4>Magnitude range:</h4></label>
      </div>
      <div id="var" aria-labelledby="var-label" class="form-group" role="radiogroup">
        <label class="control-label"><h4>Variable:</h4></label>
        <div>
          <label class="radio-inline">
            <input checked name="var" type="radio" value="magnitude">
            <span>Magnitude</span>
          </label>
          <label class="radio-inline">
            <input name="var" type="radio" value="depth">
            <span>Depth</span>
          </label>
        </div>
      </div>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
export default {
  name: "RangeSelector"
}
</script>

<style scoped>
#range-selector.card {
  padding: 10px;
}
</style>
