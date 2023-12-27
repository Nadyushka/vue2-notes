<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "AuthPage",

  data () {
    return {
      openSignDialog: true,
    }
  },
})
</script>

<template>
  <div class="auth">
    <div class="auth__titles">
      <h1 class="auth__h1">Мои заметки</h1>
      <h2 class="auth__h3">Не забывай о важном, храни его в облаке.</h2>
    </div>
    <img src="@/assets/auth_img.png" class="auth__img"/>
  </div>
</template>

<style scoped>
.auth {
  display: flex;
  align-items: center;
  gap: 214px;
  margin: 0 auto;
  max-width: 1600px;
  transition: 0.5s all;
}

@media (max-width: 1440px) {
  .auth {
    gap: 90px;
  }
}

@media (max-width: 1200px) {
  .auth {
    gap: 20px;
  }
}

@media (max-width: 1050px) {
  .auth {
    flex-direction: column;
    padding: 40px 40px 0;
    gap: 0;
  }
}

@media (max-width: 600px) {
  .auth {
    padding: 20px 20px 0;
  }
}

.auth__h1 {
  font-family: inherit;
  font-size: 104px;
  font-weight: 900;
  line-height: 104px;
  max-width: 488px;
  color: #fff;
  margin:0 0 40px;
}

@media (max-width: 1300px) {
  .auth__h1 {
    font-size: 80px;
  }
}

@media (max-width: 1050px) {
  .auth__h1 {
    text-align: center;
    max-width: 100%;
    margin: 0 auto;
    font-size: 104px;
  }
}

@media (max-width: 600px) {
  .auth__h1 {
    font-size: 60px;
    line-height: 64px;
    margin: 0 auto 20px;
    max-width: 80%;
  }
}

.auth__h3 {
  font-family: inherit;
  font-size: 32px;
  font-weight: 400;
  line-height: 48px;
  max-width: 394px;
  color: #9DA5AF;
  margin: 0;
}

@media (max-width: 1050px) {
  .auth__h3 {
    text-align: center;
    max-width: 100%;
  }
}

@media (max-width: 600px) {
  .auth__h3 {
    font-size: 24px;
    font-weight: 400;
    line-height: 36px;
    width: 90%;
    margin: 0 auto;
  }
}

.auth__img {
  transition: 0.5s all;
  width: 897px;
  height: 878px;
}

@media (max-width: 1700px) {
  .auth__img {
    width: 627px;
    height: 579px;
  }
}

@media (max-width: 1200px) {
  .auth__img {
    width: 560px;
    height: 518px;
  }
}

@media (max-width: 600px) {
  .auth__img {
    width: 298px;
    height: 275px;
  }
}
</style>
