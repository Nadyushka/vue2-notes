<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "NoteItem",

  props: ['note'],

  methods: {
    async deleteNote (noteId) {
      try {
        await this.$store.dispatch('notesStore/deleteNote', noteId)

      } catch (e) {
        console.log(e)
      }
    }
  }
})
</script>

<template>
  <div class="note__item">
    <div class="note__corner">
      <div class="note__triangle"/>
    </div>
    <h4 class="note__title"> {{ note.title }}</h4>
    <div class="note__content"> {{ note.content }}</div>
    <div class="note__bottom" @click="deleteNote(note.id)">
      <button class="note__delete">Удалить</button>
    </div>
  </div>
</template>

<style scoped>
.note__item {
  background-color: #B1C909;
  position: relative;
  flex: 0 0 calc(33.33% - 40px);
  border-radius: 12px;
}

.note__corner {
  position: absolute;
  background-position: 0 0;
  background-repeat: no-repeat;
  background-color: #0A1F38;
  width: 40px;
  height: 40px;
  top: 0;
  right: 0;
  border: none;
  border-radius: 0 0 0 12px;
  overflow: hidden;
}

.note__triangle {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.note__triangle::before {
  content: '';
  position: absolute;
  border: 21px solid transparent;
  border-bottom: 21px solid #A5BB0C;
  border-left: 21px solid #A5BB0C;
  border-radius: 0 0 0 12px;
}

.note__title {
  padding: 20px 28px;
  margin: 0;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.40);
  color: #fff;
}

.note__content {
  padding: 20px 28px;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;
  color: #fff;
  margin-bottom: 45px;
}

.note__bottom {
  position: absolute;
  right: 32px;
  bottom: 12px;
  padding: 6px 10px;
  transition: 0.2s all;
  border: 1px solid transparent;
  border-radius: 8px;
}

.note__bottom:hover {
  background-color: #97AB0D;
}

.note__bottom:active {
  background-color: #A5BB0C;
}

.note__delete {
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;
  background: none;
  border: none;
  color: #fff;
  position: relative;
  cursor: pointer;
  transition: 0.5s all;
  padding-left: 20px;
}

.note__delete::before {
  content: '';
  display: inline-block;
  position: absolute;
  background: url('@/assets/dialog-close.svg') center center no-repeat;
  cursor: pointer;
  width: 16px;
  height: 16px;
  left: 0;
  top: 8px;
  transition: 0.5s all;
}
</style>
