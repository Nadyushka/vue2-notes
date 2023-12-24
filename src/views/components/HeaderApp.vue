<script>
import {defineComponent} from 'vue'
import { mapGetters } from 'vuex'
import LoginAndSignUp from "@/views/components/loginAndSignUp.vue";

export default defineComponent({
  name: "HeaderApp",
  components: {LoginAndSignUp},

  data () {
    return {
      openSignDialog: false,
    }
  },

  computed: {
    ...mapGetters('authStore', ['isUserAuth', 'getUserEmail']),
  },

  methods: {
    openModal () {
      this.openSignDialog = true
    },

    closeSignDialog() {
      this.openSignDialog = false
    }
  }

})
</script>

<template>
  <header class="header">
    <img src="@/assets/logo.svg" alt="logo" class="header__logo"/>
    <div
        v-if="!isUserAuth"
        class="header__left btn"
        @click="openModal">
      <img src="@/assets/header__icon.svg" alt="logo"/>
      <div>Вход</div>
    </div>
    <div v-else class="header__user">
      <div class="header__email">{{ getUserEmail }}</div>
      <img src="@/assets/header_user-icon.svg" alt="user-icon" class="header__user-icon"/>
    </div>
    <LoginAndSignUp
        :openSignDialog="openSignDialog"
        @close-dialog="closeSignDialog"
    />
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  max-width: 1600px;
  margin: 0 auto 40px;
  transition: 0.5s all;
}

@media (max-width: 1440px) {
  .header {
   margin-bottom: 20px;
  }
}

.header__logo {
  transition: 0.5s all;
}

@media (max-width: 650px) {
  .header__logo {
    width: 154px;
    object-fit: contain;
  }
}

.header__left {
  padding: 12px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.header__user {
  display: flex;
  gap: 12px;
  align-items: center;
}

.header__email {
  color: #fff;
  font-size: 18px;
  font-weight: 400;
}

.header__user-icon {
  padding: 14px 18px;
  border-radius: 32px;
  background-color: #2F4056;
  cursor: pointer;
}
</style>
