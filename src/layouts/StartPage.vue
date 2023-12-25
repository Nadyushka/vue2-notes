<script>
import {defineComponent} from 'vue'
import HeaderApp from "@/views/components/HeaderApp.vue";

export default defineComponent({
  name: "StartPage",
  components: {HeaderApp}
})
</script>

<template>
  <div class="start-page">
    <HeaderApp/>
    <RouterView/>
  </div>
</template>

<style scoped>
.start-page {
  padding: 40px 160px;
  background-color: #0A1F38;
  transition: 0.5s all;
}

@media (max-width: 1440px) {
  .start-page {
    padding: 20px 80px 0;
  }
}

@media (max-width: 900px) {
  .start-page {
    padding: 20px 40px 0;
  }
}

@media (max-width: 600px) {
  .start-page {
    padding: 20px 20px 0;
  }
}
</style>
