<template>
  <div class="weather-item_big">
    <div class="weather-item__header_big">
      <img 
        class="weather-item__icon_big" 
        :src="this.$store.state.cityWeatherNow.iconurl" 
        alt="Weather icon"
      >
      <span class="weather-item__description_big">
        {{this.$store.state.cityWeatherNow.description}}
      </span>
    </div>
    <p class="weather-item__temperature_big">
      {{locale[this.$store.state.language]["temperature"]}}: 
      {{this.$store.state.cityWeatherNow.temperature}}&#176;С
    </p>
    <p class="weather-item__humidity_big">
      {{locale[this.$store.state.language]["humidity"]}}: 
      {{this.$store.state.cityWeatherNow.humidity}}%
    </p>
    <p class="weather-item__wind_big">
      {{locale[this.$store.state.language]["wind"]}}: 
      {{this.$store.state.cityWeatherNow.wind}} {{locale[this.$store.state.language]["speed"]}}
    </p>
    <p class="weather-item__date_big">
      {{locale[this.$store.state.language]["date"]}}: 
      {{this.$store.state.cityWeatherNow.date.getDate()}}.
      {{this.$store.state.cityWeatherNow.date.getMonth()+1}}.
      {{this.$store.state.cityWeatherNow.date.getFullYear()}}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      locale: this.$store.state.locale
    }
  }
}
</script>

<style>
.weather-item_big {
  border: 1px solid lightslategrey;
  border-radius: 5px;
  font-size: 20px;
  width: 50%;
  margin: 0 auto;
}

.weather-item__icon_big {
  width: 80px;
}

.weather-item__description_big {
  font-size: 28px;
}
</style>