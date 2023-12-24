<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "AddNoteDialog",

  data () {
    return {
      title: null,
      text: null,
    }
  }
})
</script>

<template>
  <div class="add-note">
    <div class="add-note__block">

    </div>
  </div>
</template>

<style scoped>
.add-note {
  
}
</style>
