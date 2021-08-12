<template>
  <div class="weather">
    <h2>{{this.$store.state.cityName}}</h2>
    <div class="weather__today">
      <span class="weather__header_big">{{locale[this.$store.state.language]["weather now"]}}</span>
      <WeatherItemBig/>
    </div>
    <div class="weather__future">
      <span class="weather__header">{{locale[this.$store.state.language]["weather future"]}}</span>
      <div class="weather-items-wrapper">
        <WeatherItem/>
      </div>
    </div>
  </div>
</template>

<script>
import WeatherItemBig from '@/components/Weather/WeatherItemBig'
import WeatherItem from '@/components/Weather/WeatherItem'

export default {
  components: {
    WeatherItemBig, WeatherItem
  },
  data() {
    return {
      locale: {
        "ru": {
          "weather now": "Погода сейчас",
          "weather future": "Погода в ближайшие часы (время местное)"
        },
        "en": {
          "weather now": "Weather now",
          "weather future": "Weather in the coming hours (local time)"
        }
      }
    }
  },
}
</script>

<style>
.weather__today {
  margin-bottom: 30px;
}

.weather__header,
.weather__header_big {
  display: inline-block;
  font-size: 24px;
  margin-bottom: 15px;
}

.weather-item__header_big,
.weather-item__header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.weather-items-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>