<template>
  <div>
    <div>
      <div class="form-group">
        <label id="daterange-label" class="control-label" for="daterange"><h4>Date range:</h4></label>
        <div class="input-group input-group-sm">
          <input class="form-control" type="text" aria-labelledby="daterange-label">
          <span class="input-group-addon"><span class="input-group-text"> to </span></span>
          <input class="form-control" type="text" aria-labelledby="daterange-label">
        </div>
      </div>
      <div class="form-group">
        <label id="quickselect-label" class="control-label" for="quickselect-selectized">Quick select</label>
      </div>
      <button class="btn btn-default action-button">Load</button>
      <hr/>
      <div class="form-group">
        <label id="magnitudeSlider-label" class="control-label"><h4>Magnitude range:</h4></label>
      </div>
      <div id="var" class="form-group" role="radiogroup" aria-labelledby="var-label">
        <label class="control-label"><h4>Variable:</h4></label>
        <div>
          <label class="radio-inline">
            <input type="radio" name="var" value="magnitude" checked>
            <span>Magnitude</span>
          </label>
          <label class="radio-inline">
            <input type="radio" name="var" value="depth">
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

</style>