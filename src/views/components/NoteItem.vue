<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "NoteItem",

  props: ['notes']
})
</script>

<template>
  <div class="note__item">
    {{ notes }}
  </div>
</template>

<style scoped>

</style>
