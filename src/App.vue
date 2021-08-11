<template>
  <div class="content-wrapper">
    <div class="header">
      <h1>Погода на ближайшие 5 дней</h1>
      <input v-bind:value="newCityName" @input="changeNewCityName" type="text" placeholder="Введите название города"/>
      <button @click="getNewCity">Найти</button>
    </div>
    <div class="weather" v-if="cityName">
      <h2>{{cityName}}</h2>
      <div class="weather__today">
        <span class="weather__header_big">Погода сейчас</span>
        <div class="weather-item_big">
          <p class="weather-item__temperature_big">Температура: {{cityWeatherNow.temperature}}</p>
          <p class="weather-item__humidity_big">Влажность: {{cityWeatherNow.humidity}}</p>
          <p class="weather-item__wind_big">Ветер: {{cityWeatherNow.wind}} м/с</p>
          <p class="weather-item__date_big">Дата: {{cityWeatherNow.date.getDate()}}.{{cityWeatherNow.date.getMonth()+1}}.{{cityWeatherNow.date.getFullYear()}}</p>
        </div>
      </div>
      <div class="weather__future">
        <span class="weather__header">Погода на следующие 5 дней (время местное)</span>
        <div class="weather-items-wrapper">
          <div class="weather-item" v-for="item in cityWeatherFuture" :key="item.id">
            <p class="weather-item__temperature">Температура: {{item.temperature}}</p>
            <p class="weather-item__humidity">Влажность: {{item.humidity}}</p>
            <p class="weather-item__wind">Ветер: {{item.wind}} м/с</p>
            <p class="weather-item__date">Дата: {{item.date.getDate()}}.{{item.date.getMonth()+1}}.{{item.date.getFullYear()}} {{item.date.getHours()}}:00</p>
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
      newCityName: ""
    }
  },
  methods: {
    async getNewCity() {
      try {
        /*THERE IS 401 ERROR!!! const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${this.newCityName}&cnt=10&appid=7ddbbac4414598a0582efd0c12096e75`)*/
        const responseCurrent = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.newCityName}&appid=7ddbbac4414598a0582efd0c12096e75&lang=ru`)
        const responseFuture = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${this.newCityName}&appid=7ddbbac4414598a0582efd0c12096e75&lang=ru`)

        console.log(responseCurrent);
        console.log(responseFuture);

        if (responseCurrent.status !== 200 && responseFuture.status !== 200) {
          throw new Error("Не удалось получить данные по введенному городу")
        }
        
        const currentOffset = new Date().getTimezoneOffset() + (responseCurrent.data.timezone / 60)

        this.cityName = responseCurrent.data.name

        console.log("Timezone offset: ", new Date().getTimezoneOffset());
        console.log("Data offset: ", responseCurrent.data.timezone / 60);
        console.log("Current offset: ", currentOffset);

        this.cityWeatherNow = {
          temperature: Math.round(responseCurrent.data.main.temp - 273),
          date: new Date(responseCurrent.data.dt * 1000 + currentOffset * 60),
          humidity: responseCurrent.data.main.humidity,
          wind: responseCurrent.data.wind.speed
        }
        console.log(this.cityWeatherNow);
        

        let transformedArray = responseFuture.data.list.map((item, index) => {
          return {
            id: index,
            temperature: Math.round(item.main.temp - 273),
            date: new Date((item.dt + (currentOffset * 60)) * 1000),
            humidity: item.main.humidity,
            wind: item.wind.speed
          }
        })

        this.cityWeatherFuture = []
        for (let i = 0; i < transformedArray.length; i++) {
          this.cityWeatherFuture.push(transformedArray[i])
        }

        console.log(this.cityWeatherFuture);
      } catch(e) {
        alert("Ошибка: ", e)
      }
    },
    changeNewCityName(event) {
      this.newCityName = event.target.value
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.content-wrapper {
  width: 1200px;
  margin: 0 auto;
}

.header {
  margin-bottom: 30px;
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

.weather-item_big {
  border: 1px solid lightslategrey;
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
}

.weather-item:nth-child(5n) {
  border-right: 0px;
}
</style>
