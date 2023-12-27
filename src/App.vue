<template>
  <div>
    <component :is="layoutComponent" />
  </div>
</template>

<script>
import StartPage from "@/layouts/StartPage.vue";
import MainPage from "@/layouts/MainPage.vue";

export default {
  components: {
    StartPage,
    MainPage
  },

  computed: {
    layoutComponent() {
      return this.$route.meta.layout === 'auth' ? StartPage : MainPage;
    }
  },

  async mounted() {
     try {
       if (localStorage.getItem('accessToken')) {
         await this.$store.dispatch('authStore/me')
       }
     } catch (e) {
       console.log(e)
     }
  }
};

</script>
