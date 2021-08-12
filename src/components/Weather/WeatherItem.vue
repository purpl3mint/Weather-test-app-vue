<template>
  <div class="weather-item" v-for="item in this.$store.state.cityWeatherFuture" :key="item.id">
    <div class="weather-item__header">
      <img class="weather-item__icon" :src="item.iconurl" alt="Weather icon">
      <span class="weather-item__description">{{item.description}}</span>
    </div>
    <p class="weather-item__temperature">{{locale[this.$store.state.language]["temperature"]}}: {{item.temperature}}&#176;С</p>
    <p class="weather-item__humidity">{{locale[this.$store.state.language]["humidity"]}}: {{item.humidity}}%</p>
    <p class="weather-item__wind">{{locale[this.$store.state.language]["wind"]}}: {{item.wind}} {{locale[this.$store.state.language]["speed"]}}</p>
    <p class="weather-item__date">{{locale[this.$store.state.language]["date"]}}: {{item.date.getDate()}}.{{item.date.getMonth()+1}}.{{item.date.getFullYear()}} {{item.date.getHours()}}:00</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      locale: {
        "ru": {
          "temperature": "Температура",
          "humidity": "Влажность",
          "wind": "Ветер",
          "date": "Дата",
          "speed": "м/с"
        },
        "en": {
          "temperature": "Temperature",
          "humidity": "Humidity",
          "wind": "Wind",
          "date": "Date",
          "speed": "m/s"
        }
      }
    }
  },
}
</script>

<style>
.weather-item {
  width: 200px;
  border-right: 1px solid lightslategrey;
  padding: 19px;
  margin-bottom: 25px;
  font-size: 16px;
}

.weather-item:nth-child(5n) {
  border-right: 0px;
}

.weather-item__description {
  font-size: 20px;
}
</style>