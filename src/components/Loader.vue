<template>
  <div class="loader">
      {{locale[this.$store.state.language]["loading"]}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      locale: {
        "ru": {
          "loading": "Загрузка..."
        },
        "en": {
          "loading": "Loading..."
        }
      }
    }
  }
}
</script>

<style scoped>
.loader {
  font-size: 36px;
}
</style>