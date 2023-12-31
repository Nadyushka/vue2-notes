<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "AddNoteDialog",

  props: ['isAddNoteModalOpen'],

  data() {
    return {
      title: '',
      text: '',
      errorMessage: '',
      timerId: undefined,
    }
  },

  methods: {
    closeAddNoteModal() {
      this.$emit('close-modal')
      this.title = ''
      this.text = ''
    },

    async createNote() {

      await clearTimeout(this.timerId)
      this.errorMessage = ''

      setTimeout(async ()=> {
        if (this.titleErrorMessage || this.textErrorMessage) {
          this.errorMessage = 'Необходимо проверить введенные данные'
          this.timerId = setTimeout(() => this.errorMessage = '', 3000)
          return
        }

        if (!this.title || !this.text) {
          this.errorMessage = 'Необходимо заполнить все поля'
          this.timerId = setTimeout(() => this.errorMessage = '', 3000)
          return
        }

        try {
          await this.$store.dispatch('notesStore/createNote', {
            title: this.title,
            content: this.text,
          })

          this.closeAddNoteModal()
        } catch (e) {
          console.log(e)
        }
      }, 100)

    }
  },

  computed: {
    titleErrorMessage() {
      if (this.title.length > 100) {
        return 'Максимальная длина - 100 символов'
      }

      return ''
    },
    textErrorMessage() {
      if (this.text.length > 250) {
        return 'Максимальная длина - 250 символов'
      }

      return ''
    },

    showErrorMessage() {
      return this.errorMessage.length > 0
    }
  }
})
</script>

<template>
  <div>
    <div
        class="add-note"
        :class="{ 'add-note__active': isAddNoteModalOpen }">
      <div class="add-note__block">
        <button
            class="dialog__close-btn btn"
            @click="closeAddNoteModal"/>

        <h2 class="dialog__title">Добавление заметки</h2>
        <div class="dialog__label">Название заметки</div>
        <input class="dialog__input input" v-model="title"/>
        <div class="dialog__info">
          <div class="dialog__error"> {{ titleErrorMessage }}</div>
          <div class="dialog__length"> {{ title.length }}/100</div>
        </div>

        <div class="dialog__label">Текст заметки</div>
        <textarea class="dialog__textarea input" v-model="text"/>
        <div class="dialog__info">
          <div class="dialog__error"> {{ textErrorMessage }}</div>
          <div class="dialog__length"> {{ text.length }}/250</div>
        </div>
        <div class="dialog__wrapper">
          <button class="dialog__create-btn btn" @click="createNote">Добавить</button>
        </div>

      </div>

    </div>

    <div class="snackBar" :class="{'snackBar_active': showErrorMessage}"> {{ errorMessage }}</div>
  </div>
</template>

<style scoped>
.add-note {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: scale(0);
  background-color: rgb(10, 31, 56, 0.7);
  transition: all 0s;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.add-note__active {
  transition: transform 0.4s;
  transform: scale(1);
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
}

.add-note__block {
  max-width: 780px;
  padding: 80px;
  background-color: #1B2F46;
  border-radius: 40px;
  position: relative;
}

@media (max-width: 1440px) {
  .add-note__block {
    max-width: 594px;
    padding: 56px;
  }
}

@media (max-width: 900px) {
  .add-note__block {
    max-width: 688px;
  }
}

@media (max-width: 600px) {
  .add-note__block {
    max-width: 352px;
    padding: 24px 16px;
  }
}

@media (max-width: 1440px) {
  .dialog__title {
   width: 90%;
    line-height: 72px;
  }
}

@media (max-width: 900px) {
  .dialog__title {
    width: 100%;
  }
}

@media (max-width: 600px) {
  .dialog__title {
    font-size: 32px;
    line-height: 36px;
    margin-bottom: 38px;
  }
}

.dialog__input {
  width: 100%;
  padding: 23px 28px;
  color: #0A1F38;
  background-color: #fff;
  margin-bottom: 8px;
  border-radius: 36px;
  border: 2px solid #fff;
  cursor: pointer;
  transition: 0.2s all;
  font-size: 18px;
}

.dialog__textarea {
  width: 100%;
  padding: 23px 28px;
  color: #0A1F38;
  background-color: #fff;
  margin-bottom: 8px;
  border-radius: 36px;
  border: 2px solid #fff;
  cursor: pointer;
  transition: 0.2s all;
  font-size: 18px;
  min-height: 280px;
  resize: none;
  caret-color: auto;
  user-select: text;
}

@media (max-width: 1440px) {
  .dialog__textarea {
    min-height: 240px;
  }
}

@media (max-width: 600px) {
  .dialog__textarea {
    min-height: 160px;
  }
}

.dialog__info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  padding-left: 24px;
}

.dialog__error {
  color: #FF7461;
}

.dialog__length {
  text-align: right;
  color: #9DA5AF;
}

@media (max-width: 600px) {
  .dialog__length {
    line-height: 28px;
  }
}

.dialog__create-btn {
  padding: 12px 24px;
  border: none;
}

@media (max-width: 600px) {
  .dialog__create-btn {
    width: 100%;
  }
}

.dialog__wrapper {
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
}

.snackBar {
  position: fixed;
  right: -100%;
  bottom: 20px;
  padding: 12px 20px;
  border-radius: 12px;
  border: 1px solid #0A1F38;
  color: #ffffff;
  z-index: 10000;
  transition: 0.2s all;
  background-color: #B1C909;
}

.snackBar_active {
  right: 20px;
}
</style>
