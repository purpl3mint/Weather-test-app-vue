<template>
  <div class="loader">
      {{locale[this.$store.state.language]["loading"]}}
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

<style scoped>
.loader {
  font-size: 36px;
}
</style>