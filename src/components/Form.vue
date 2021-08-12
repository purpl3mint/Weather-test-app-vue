<template>
  <div class="form">
    <input class="form__input" v-model="newCityName" type="text" :placeholder="placeholder"/>
    <button class="form__button" @click="getNewCity">
      {{locale[this.$store.state.language]["search"]}}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newCityName: "",
      locale: this.$store.state.locale
    }
  },
  methods: {
    getNewCity() {
      this.$store.dispatch('getNewCity', this.newCityName)
    }
  },
  computed: {
    placeholder() {
      return this.locale[this.$store.state.language]["input name"]
    }
  }
}
</script>

<style>
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
</style>