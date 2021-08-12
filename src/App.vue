<template>
  <Navbar/>
  <div class="content-wrapper">
    <Form/>
    <Loader  v-if="this.$store.state.loading"/>
    <Weather 
      v-else-if="this.$store.state.cityName" 
    />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Loader from '@/components/Loader'
import Weather from '@/components/Weather/Weather'
import Form from '@/components/Form'

export default {
  components: {
    Navbar, Loader, Weather, Form
  },
  data() {
    return {
      locale: {
        "ru": {
          "input name": "Введите название города",
          "search": "Найти"
        },
        "en": {
          "input name": "Input city name",
          "search": "Find"
        }
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

.content-wrapper {
  width: 1200px;
  margin: 0 auto;
}
</style>
