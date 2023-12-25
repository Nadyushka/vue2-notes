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
  gap: 40px;
  flex-wrap: wrap;
  padding-bottom: 40px;
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
}
</style>
