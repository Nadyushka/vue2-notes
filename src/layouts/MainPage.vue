<script>
import {defineComponent} from 'vue'
import HeaderApp from "@/views/components/HeaderApp.vue";

export default defineComponent({
  name: "MainPage",
  components: {HeaderApp}
})
</script>

<template>
  <div class="main-page">
    <HeaderApp/>
    <RouterView/>
  </div>
</template>

<style scoped>
.main-page {
  padding: 40px 160px 0;
  background-color: #0A1F38;
  transition: 0.5s all;
  height: 99vh;
}

@media (max-width: 1440px) {
  .main-page {
    padding: 20px 80px 0;
  }
}

@media (max-width: 900px) {
  .main-page {
    padding: 20px 40px 0;
  }
}

@media (max-width: 600px) {
  .main-page {
    padding: 20px 20px 0;
  }
}
</style>
