<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "loginAndSignUp",

  props: ['openSignDialog'],

  data() {
    return {
      isPasswordVisible: false,
      isConfirmPasswordVisible: false,
      isLoginDialog: true,
      email: undefined,
      password: undefined,
      confirmPassword: undefined,
    }
  },

  methods: {
    closeDialog() {
      this.$emit('close-dialog')
    },

    setPasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible
    },

    setRepeatPasswordVisibility() {
      this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible
    },

    toggleSignUpAndSignIn() {
      this.isLoginDialog = !this.isLoginDialog
    },

    async signUp() {
      try {
        const res = await this.$store.dispatch('authStore/signUp', {
          email: this.email,
          password: this.password,
          confirm_password: this.confirmPassword,
        })

        if (!res.errorMessage) {
          await this.$router.push('/home');
        }
      } catch (e) {
        console.log(e)
      }
    },

    async signIn() {
      try {
        const res = await this.$store.dispatch('authStore/signIn', {
          email: this.email,
          password: this.password,
        });

        if (res.data.accessToken) {
          await this.$router.push('/home');
        }

      } catch (e) {
        console.log(e)
      }
    }
  },

  computed: {
    passwordIcon() {
      return this.isPasswordVisible ? require('@/assets/input-hide.svg') : require('@/assets/input-visible.svg')
    },

    repeatPasswordIcon() {
      return this.isConfirmPasswordVisible ? require('@/assets/input-hide.svg') : require('@/assets/input-visible.svg')
    }
  },
})
</script>

<template>
  <div
      class="dialog"
      :class="{
        'dialog_active': openSignDialog,
      }"
  >
    <div
        class="dialog__block"
        v-if="openSignDialog"
    >
      <button
          class="dialog__close-btn btn"
          @click="closeDialog"/>

      <h2 class="dialog__title">{{ isLoginDialog ? 'Вход в ваш аккаунт' : 'Регистрация' }}</h2>

      <div class="dialog__label">Email</div>
      <input
          v-model="email"
          class="dialog__input input"
          placeholder="Введите значение"
          autofocus/>


      <div class="dialog__password">
        <div class="dialog__label">Пароль</div>
        <input
            v-model="password"
            class="dialog__input input"
            placeholder="Введите пароль"
            :type="isPasswordVisible ? 'text' : 'password'"
        />
        <img
            :src="passwordIcon"
            class="input__password-icon"
            alt="Password visibility icon"
            @click="setPasswordVisibility"
        />
      </div>

      <div v-if="!isLoginDialog" class="dialog__password">
        <div class="dialog__label">Пароль ещё раз</div>
        <input
            v-model="confirmPassword"
            class="dialog__input input"
            placeholder="Повторите пароль"
            :type="isConfirmPasswordVisible ? 'text' : 'password'"
        />
        <img
            :src="repeatPasswordIcon"
            class="input__password-icon"
            alt="Password visibility icon"
            @click="setRepeatPasswordVisibility"
        />
      </div>

      <div class="dialog__text">
        <div> {{ isLoginDialog ? 'У вас нет аккаунта?' : 'У вас есть аккаунт?' }}
          <span
              class="dialog__action"
              @click="toggleSignUpAndSignIn"
          >
            {{ isLoginDialog ? 'Зарегистрируйтесь' : 'Войдите' }}
          </span>
        </div>

        <button
            class="dialog__enter btn"
            @click="() => isLoginDialog ? signIn() : signUp()"
        >
          {{ isLoginDialog ? 'Войти' : 'Зарегистрироваться' }}
        </button>
      </div>

      <div class="dialog__error">Пользователь с таким логином не найден</div>
    </div>

  </div>

</template>

<style scoped>
.dialog {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: scale(0);
  background-color: rgb(10, 31, 56, 0.7);
  transition: transform 0.4s;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.dialog_active {
  transition: transform 0.4s;
  transform: scale(1);
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
}

.dialog__block {
  width: 780px;
  padding: 80px;
  background-color: #1B2F46;
  border-radius: 40px;
  position: relative;
}

.dialog__password {
  position: relative;
}

.dialog__input {
  width: 100%;
  padding: 23px 28px;
  color: #0A1F38;
  background-color: #fff;
  margin-bottom: 24px;
  border-radius: 36px;
  border: 2px solid #fff;
  cursor: pointer;
  transition: 0.2s all;
  font-size: 18px;
}

.dialog__input::placeholder {
  color: #9DA5AF;
}

.input__password-icon {
  position: absolute;
  right: 29px;
  top: 50%;
  cursor: pointer;
}

.dialog__text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: 400;
  line-height: 28px;
  color: #9DA5AF;
  margin-bottom: 20px;
}

.dialog__action {
  color: #B1C909;
  transition: 0.2s all;
  cursor: pointer;
}

.dialog__action:active {
  color: #fff;
}

.dialog__enter {
  border: none;
  padding: 12px 24px;
}

.dialog__error {
  border-radius: 24px;
  background-color: rgba(255, 116, 97, 0.10);
  padding: 8px 22px;
  color: #FF7461;
}
</style>
