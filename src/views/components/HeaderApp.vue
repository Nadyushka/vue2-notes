<script>
import {defineComponent} from 'vue'
import {mapGetters} from 'vuex'
import LoginAndSignUp from "@/views/components/loginAndSignUp.vue";

export default defineComponent({
  name: "HeaderApp",
  components: {LoginAndSignUp},

  data() {
    return {
      openSignDialog: false,
      showPopUp: false,
    }
  },

  computed: {
    ...mapGetters('authStore', ['isUserAuth', 'getUserEmail']),
  },

  methods: {
    openModal() {
      this.openSignDialog = true
    },

    closeSignDialog() {
      this.openSignDialog = false
    },

    popUpToggle () {
      this.showPopUp = !this.showPopUp
    },

    async logOut () {
      try {
        await this.$store.dispatch('authStore/logOut')

        await this.$router.push('/')

      } catch (e) {
        console.log(e)
      }
    }
  }

})
</script>

<template>
  <header class="header">
    <img src="@/assets/logo.svg" alt="logo" class="header__logo" :class="{'header__logo_mobile': isUserAuth}"/>
    <div
        v-if="!isUserAuth"
        class="header__left btn"
        @click="openModal">
      <img src="@/assets/header__icon.svg" alt="logo"/>
      <div>Вход</div>
    </div>
    <div v-else class="header__user">
      <div class="header__email">{{ getUserEmail }}</div>
      <img
          src="@/assets/header_user-icon.svg"
          alt="user-icon"
          class="header__user-icon"
          @click="popUpToggle"/>

      <div :class="{ 'header__pop-up_active': showPopUp }"
           class="header__pop-up">
        <div class="header__pop-up-body" @click="logOut">
          Выйти
        </div>
      </div>
    </div>

    <div v-if="showPopUp"
         class="header__pop-up-bg"
         @click="popUpToggle"/>

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
  transition: 0.2s all;
}

@media (max-width: 1440px) {
  .header {
    margin-bottom: 20px;
  }
}

.header__logo {
  transition: 0.5s width;
}

@media (max-width: 650px) {
  .header__logo {
    width: 154px;
    object-fit: contain;
  }

  .header__logo_mobile {
    width: 65px;
    object-fit: cover;
    object-position: 0 0;
    scale: 0.5;
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
  position: relative;
}

.header__pop-up-bg {
  position: absolute;
  top: 70px;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: transparent;
  z-index: 9999;
}

.header__pop-up {
  position: absolute;
  background-color: #1B2F46;
  top: 70px;
  right: 0;
  z-index: 99999;
  border-radius: 12px;
  padding: 40px;
  opacity: 0;
  transition: 0.5s all;
}

.header__pop-up_active {
  opacity: 1;
}

.header__pop-up-body {
  position: relative;
  color: #B1C909;
  cursor: pointer;
}

.header__pop-up-body::before {
  content: '';
  position: absolute;
  border: 8px solid transparent;
  border-bottom: 8px solid #1B2F46;
  top: -55px;
  right: -20px;
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
