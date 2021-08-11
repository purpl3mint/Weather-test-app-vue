<template>
  <nav class="nav">
    <h1 class="nav__title">{{locale[language]["weather forecast"]}}</h1>
    <select name="language" id="language" class="nav__language" v-model="language" @change="getNewCity">
      <option value="ru" selected>{{locale[language]["language ru"]}}</option>
      <option value="en">{{locale[language]["language en"]}}</option>
    </select>
  </nav>
  <div class="content-wrapper">
    <div class="form">
      <input class="form__input" v-model="newCityName" type="text" v-bind:placeholder="placeholder"/>
      <button class="form__button" @click="getNewCity">{{locale[language]["search"]}}</button>
    </div>
    <div class="loader" v-if="loading">
      Идет загрузка...
    </div>
    <div class="weather" v-else-if="cityName">
      <h2>{{cityName}}</h2>
      <div class="weather__today">
        <span class="weather__header_big">{{locale[language]["weather now"]}}</span>
        <div class="weather-item_big">
          <div class="weather-item__header_big">
            <img class="weather-item__icon_big" v-bind:src="cityWeatherNow.iconurl" alt="Weather icon">
            <span class="weather-item__description_big">{{cityWeatherNow.description}}</span>
          </div>
          <p class="weather-item__temperature_big">{{locale[language]["temperature"]}}: {{cityWeatherNow.temperature}}&#176;С</p>
          <p class="weather-item__humidity_big">{{locale[language]["humidity"]}}: {{cityWeatherNow.humidity}}%</p>
          <p class="weather-item__wind_big">{{locale[language]["wind"]}}: {{cityWeatherNow.wind}} {{locale[language]["speed"]}}</p>
          <p class="weather-item__date_big">{{locale[language]["date"]}}: {{cityWeatherNow.date.getDate()}}.{{cityWeatherNow.date.getMonth()+1}}.{{cityWeatherNow.date.getFullYear()}}</p>
        </div>
      </div>
      <div class="weather__future">
        <span class="weather__header">{{locale[language]["weather future"]}}</span>
        <div class="weather-items-wrapper">
          <div class="weather-item" v-for="item in cityWeatherFuture" :key="item.id">
            <div class="weather-item__header">
              <img class="weather-item__icon" v-bind:src="item.iconurl" alt="Weather icon">
              <span class="weather-item__description">{{item.description}}</span>
            </div>
            <p class="weather-item__temperature">{{locale[language]["temperature"]}}: {{item.temperature}}&#176;С</p>
            <p class="weather-item__humidity">{{locale[language]["humidity"]}}: {{item.humidity}}%</p>
            <p class="weather-item__wind">{{locale[language]["wind"]}}: {{item.wind}} {{locale[language]["speed"]}}</p>
            <p class="weather-item__date">{{locale[language]["date"]}}: {{item.date.getDate()}}.{{item.date.getMonth()+1}}.{{item.date.getFullYear()}} {{item.date.getHours()}}:00</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return { 
      cityName: "",
      cityWeatherNow: {},
      cityWeatherFuture: [],
      newCityName: "",
      loading: false,
      language: "ru",
      apikey: "7ddbbac4414598a0582efd0c12096e75",
      locale: {
        "ru": {
          "weather forecast": "Прогноз погоды",
          "language ru": "Русский",
          "language en": "Английский",
          "weather now": "Погода сейчас",
          "temperature": "Температура",
          "humidity": "Влажность",
          "wind": "Ветер",
          "date": "Дата",
          "weather future": "Погода в ближайшие часы (время местное)",
          "input name": "Введите название города",
          "search": "Найти",
          "loading": "Загрузка...",
          "speed": "м/с"
        },
        "en": {
          "weather forecast": "Weather forecast",
          "language ru": "Russian",
          "language en": "English",
          "weather now": "Weather now",
          "temperature": "Temperature",
          "humidity": "Humidity",
          "wind": "Wind",
          "date": "Date",
          "weather future": "Weather in the coming hours (local time)",
          "input name": "Input city name",
          "search": "Find",
          "loading": "Loading...",
          "speed": "m/s"
        }
      }
    }
  },
  computed: {
    placeholder() {
      return this.locale[this.language]["input name"]
    }
  },
  methods: {
    async getNewCity() {
      try {
        this.loading = true
        if (this.newCityName === "") {
          throw new Error("Отсутствует название города")
        }

        const responseCurrent = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.newCityName}&appid=${this.apikey}&lang=${this.language}`)
        const responseFuture = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${this.newCityName}&appid=${this.apikey}&lang=${this.language}`)

        console.log(responseCurrent);
        console.log(responseFuture);

        if (responseCurrent.status !== 200 && responseFuture.status !== 200) {
          throw new Error("Не удалось получить данные по введенному городу")
        }
        
        const currentOffset = new Date().getTimezoneOffset() + (responseCurrent.data.timezone / 60)

        this.cityName = responseCurrent.data.name

        this.cityWeatherNow = {
          temperature: Math.round(responseCurrent.data.main.temp - 273),
          date: new Date(responseCurrent.data.dt * 1000 + currentOffset * 60),
          humidity: responseCurrent.data.main.humidity,
          wind: responseCurrent.data.wind.speed,
          iconurl: "http://openweathermap.org/img/w/" + responseCurrent.data.weather[0].icon + ".png",
          description: responseCurrent.data.weather[0].description[0].toUpperCase() + responseCurrent.data.weather[0].description.substring(1)
        }
        console.log(this.cityWeatherNow);
        

        let transformedArray = responseFuture.data.list.slice(0, 10).map((item, index) => {
          return {
            id: index,
            temperature: Math.round(item.main.temp - 273),
            date: new Date((item.dt + (currentOffset * 60)) * 1000),
            humidity: item.main.humidity,
            wind: item.wind.speed,
            iconurl: "http://openweathermap.org/img/w/" + item.weather[0].icon + ".png",
            description: item.weather[0].description[0].toUpperCase() + item.weather[0].description.substring(1)
          }
        })

        this.cityWeatherFuture = []
        for (let i = 0; i < transformedArray.length; i++) {
          this.cityWeatherFuture.push(transformedArray[i])
        }

        console.log(this.cityWeatherFuture);

        this.loading = false
      } catch(e) {
        this.loading = false
        alert("Ошибка: ", e)
      }
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav {
  width: 96%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding-left: 2%;
  padding-right: 2%;
  border-bottom: 1px solid lightslategrey;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  margin-bottom: 30px;
}

.nav__language {
  height: 30px;
}

.content-wrapper {
  width: 1200px;
  margin: 0 auto;
}

.form {
  margin-bottom: 30px;
}

.form__input {
  width: 50%;
  font-size: 32px;
  margin-right: 20px;
  padding-left: 10px;
}

.form__button {
  width: 120px;
  font-size: 32px;
}

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

.weather-item__description {
  font-size: 20px;
}

.weather-items-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

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
</style>
