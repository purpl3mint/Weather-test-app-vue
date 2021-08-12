<template>
  <nav class="nav">
    <h1 class="nav__title">{{locale[this.$store.state.language]["weather forecast"]}}</h1>
    <select name="language" id="language" class="nav__language" v-model="languageCurrent" @change="changeLanguage">
      <option value="ru" selected>{{locale[this.$store.state.language]["language ru"]}}</option>
      <option value="en">{{locale[this.$store.state.language]["language en"]}}</option>
    </select>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      languageCurrent: this.$store.state.language,
      locale: {
        "ru": {
          "weather forecast": "Прогноз погоды",
          "language ru": "Русский",
          "language en": "Английский"
        },
        "en": {
          "weather forecast": "Weather forecast",
          "language ru": "Russian",
          "language en": "English"
        }
      }
    }
  },
  methods: {
    changeLanguage() {
      this.$store.dispatch('setLanguage', this.languageCurrent)
    }
  }
}
</script>

<style scoped>
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
</style>