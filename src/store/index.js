import { createStore } from 'vuex'
import axios from 'axios'
import ruLocale from '@/locales/ru'
import enLocale from '@/locales/en'

export default createStore({
  state: {
    cityName: "",
    cityWeatherNow: {},
    cityWeatherFuture: [],
    loading: false,
    apikey: "7ddbbac4414598a0582efd0c12096e75",
    language: "ru",
    locale: {
      "ru": ruLocale,
      "en": enLocale
    }
  },
  mutations: {
    setCityName(state, cityName) {
      state.cityName = cityName
    },
    toggleLoading(state) {
      state.loading = !state.loading
    }
  },
  actions: {
    async getNewCity({state, commit}, newCityName) {
      if (newCityName === "")
        return
      try {
        commit('toggleLoading')

        const responseCurrent = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${newCityName}&appid=${state.apikey}&lang=${state.language}`)
        const responseFuture = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${newCityName}&appid=${state.apikey}&lang=${state.language}`)

        //console.log(responseCurrent);
        //console.log(responseFuture);

        if (responseCurrent && 
            responseCurrent.status !== 200 && 
            responseFuture &&
            responseFuture.status !== 200) {
          throw new Error("Не удалось получить данные по введенному городу")
        }
        
        const currentOffset = new Date().getTimezoneOffset() + (responseCurrent.data.timezone / 60)

        //this.cityName = responseCurrent.data.name
        commit('setCityName', responseCurrent.data.name)

        state.cityWeatherNow = {
          temperature: Math.round(responseCurrent.data.main.temp - 273),
          date: new Date(responseCurrent.data.dt * 1000 + currentOffset * 60),
          humidity: responseCurrent.data.main.humidity,
          wind: responseCurrent.data.wind.speed,
          iconurl: "http://openweathermap.org/img/w/" + responseCurrent.data.weather[0].icon + ".png",
          description: responseCurrent.data.weather[0].description[0].toUpperCase() + responseCurrent.data.weather[0].description.substring(1)
        }
        
        //console.log(this.cityWeatherNow);
      
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

        state.cityWeatherFuture = []
        for (let i = 0; i < transformedArray.length; i++) {
          state.cityWeatherFuture.push(transformedArray[i])
        }

        //console.log(this.cityWeatherFuture);

        commit('toggleLoading')
      } catch(e) {
        commit('toggleLoading')
        alert("Ошибка: ", e)
      }
    },
    setLanguage({state, dispatch}, language) {
      state.language = language
      dispatch('getNewCity', state.cityName)
    }
  },
  modules: {
  }
})
