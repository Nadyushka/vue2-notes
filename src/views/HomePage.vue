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
      openAddNoteModal: false,
    }
  }

})
</script>

<template>
  <div class="home">
    <NoteItem :note="note" v-for="note in getNotes" :key="note.id"/>
    <AddNoteDialog :openAddNoteModal="openAddNoteModal"/>
    <button class="home__add-note btn"/>
  </div>
</template>

<style scoped>
.home {

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
