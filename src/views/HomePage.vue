<script>
import {defineComponent} from 'vue'
import {mapGetters} from "vuex";
import NoteItem from "@/views/components/NoteItem.vue";
import AddNoteDialog from "@/views/components/AddNoteDialog.vue";

export default defineComponent({
  name: "HomePage",
  components: {AddNoteDialog, NoteItem},

  async mounted() {
    try {
      await this.$store.dispatch('notesStore/getNotes')
    } catch (e) {
      console.log(e)
    }
  },

  computed: {
    ...mapGetters('notesStore', ['getNotes']),
  },

  data () {
    return {
      isAddNoteModalOpen: false,
    }
  },

  methods: {
    closeModal() {
      this.isAddNoteModalOpen = false
    },

    openModal() {
      this.isAddNoteModalOpen = true
    },
  }

})
</script>

<template>
  <div class="home">
    <NoteItem :note="note" v-for="note in getNotes" :key="note.id"/>
    <AddNoteDialog
        @close-modal="closeModal"
        :isAddNoteModalOpen="isAddNoteModalOpen"/>
    <button
        class="home__add-note btn"
        @click="openModal"/>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 40px;
  max-width: 1600px;
  margin: 0 auto;
}

.home > * {
  margin-right: 40px;
  margin-bottom: 40px;
}

.home > :nth-child(3n) {
  margin-right: 0;
}

@media (max-width: 1440px) {
  .home > * {
    margin-right: 20px;
    margin-bottom: 20px;
  }
}

@media (max-width: 1000px) {
  .home > * {
    margin-right: 0;
    margin-bottom: 20px;
  }
}

.home__add-note {
  position: fixed;
  right: 40px;
  bottom: 40px;
  width: 56px;
  height: 56px;
  background-image: url('@/assets/main_add-note.svg') ;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 56px;
  border: none;
  box-shadow: 0 15px 46px -10px rgba(0, 0, 0, 0.60);
}

@media (max-width: 900px) {
  .home__add-note {
    right: 8px;
  }
}
</style>
