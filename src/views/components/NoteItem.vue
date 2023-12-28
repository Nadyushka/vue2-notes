<script>
import {defineComponent} from 'vue'
import {mapGetters} from "vuex";

export default defineComponent({
  name: "NoteItem",

  props: ['note'],

  computed: {
    ...mapGetters('notesStore', ['getNotes'])
  },

  methods: {
    async deleteNote(noteId) {
      try {
        await this.$store.dispatch('notesStore/deleteNote', noteId)

      } catch (e) {
        console.log(e)
      }
    },

    dragStart(event, id) {
      event.dataTransfer.setData('draggableItemId', id)
    },
    drop(event, id) {
      const draggableItemId = +event.dataTransfer.getData('draggableItemId')
      const dragItemIdx = this.getNotes.findIndex(note => note.id === draggableItemId)
      const dropItemIdx = this.getNotes.findIndex(note => note.id === id)
      const note = this.getNotes.find(note => note.id === draggableItemId)

      const currentNotes = [...this.getNotes]

      currentNotes.splice(dragItemIdx, 1)
      currentNotes.splice(dropItemIdx, 0, note)

      document.querySelectorAll('.note__item').forEach(note => {
        note.classList.remove('note__item_dragover')
      })

      this.$store.dispatch('notesStore/setUpdatedNotes', currentNotes)
    },
    dragover(event) {
      const noteItem = event.target.closest('.note__item')
      noteItem.classList.add('note__item_dragover')
    },
    dragleave(event) {
      const noteItem = event.target.closest('.note__item')
      noteItem.classList.remove('note__item_dragover')
    },
  } ,

})
</script>

<template>
  <div
      class="note__item"
      @dragstart="dragStart($event, note.id)"
      @drop.prevent="drop($event, note.id)"
      @dragover.prevent="dragover($event)"
      @dragleave="dragleave($event)"
      draggable="true"
  >
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
  flex: 0 1 calc(33.33% - 80px / 3);
  border-radius: 12px 50px 12px 12px;
  height: auto;
  align-self: flex-start;
  cursor: grab;
}

.note__item_dragover {
  transition: 0.2s all;
  background-color: #819400;
  scale: 0.95;
}

@media (max-width: 1440px) {
  .note__item {
    flex: 0 1 calc(33.33% - 40px / 3);
  }
}

@media (max-width: 1000px) {
  .note__item {
    flex: 0 1 100%;
  }
}


.note__corner {
  position: absolute;
  background-repeat: no-repeat;
  background-color: #0A1F38;
  width: 40px;
  height: 40px;
  top: 0;
  right: 0;
  border: none;
  border-radius: 0 0 0 12px;
}

.note__triangle {
  position: relative;
  width: 100%;
  height: 100%;
}

.note__triangle::before {
  content: '';
  position: absolute;
  left: -1px;
  top: 0;
  border: 22px solid transparent;
  border-bottom: 21px solid #A5BB0C;
  border-left: 21px solid #A5BB0C;
  border-radius: 0 0 0 11px;
}

.note__title {
  margin: 0;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.40);
  color: #fff;
  padding: 20px 10% 20px 28px;
  word-break: break-all;
}

@media (max-width: 600px) {
  .note__title {
    font-size: 20px;
    line-height: 26px;
    padding-right: 30%;
  }
}

.note__content {
  padding: 20px 28px;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;
  color: #fff;
  margin-bottom: 45px;
  word-break: break-all;
}

@media (max-width: 600px) {
  .note__content {
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 60px;
  }
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
