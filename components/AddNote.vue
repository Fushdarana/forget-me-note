<template>
    <img
      @click="() => addNote()"
      :src="require('@/assets/icons/add.svg')"
      alt="add"
      class="addicon"
    />
</template>

<script>
export default {
  methods: {
    async addNote() {
      const date = new Date()
      const day = `${date.toISOString().slice(0, 10)} ${date.getHours()}:${date.getMinutes()}`

      const newNote = await this.$axios.$post('http://localhost:4000/notes/', {
        title: 'Новая заметка',
        content: 'Введите Ваш текст...',
        liked: false,
        created_at: day
      })
      await this.$store.dispatch('fetchNotes')
      await this.$router.push(`/${newNote.id}`)
    },
  }
}
</script>

