<template>
    <img
      @click="() => addNote()"
      :src="require('@/assets/icons/add.svg')"
      alt="add"
    />
</template>

<script>
export default {
  methods: {
    async addNote() {
      const currentDate = new Date()
      const creationDate = `${currentDate.toISOString().slice(0, 10)} ${currentDate.getHours()}:${currentDate.getMinutes()}`

      const newNote = await this.$axios.$post('http://localhost:4000/notes/', {
        title: 'Новая заметка',
        content: 'Введите Ваш текст...',
        liked: false,
        created_at: creationDate
      })
      await this.$store.dispatch('fetchNotes')
      await this.$router.push(`/${newNote.id}`)
    },
  }
}
</script>

