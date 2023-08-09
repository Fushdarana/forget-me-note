<template>
  <div class="navigation">
    <div class="navigation__profile-container">
      <img
        class="profile_avatar"
        :src="require('@/assets/avatars/mainIcon.png')"
        alt="icon"/>
      <span>Имя пользователя</span>
    </div>
    <div
      class="navigation__notes-container"
      v-for="note in notes">
      <NavigationNotes
        :note="note"
      />
    </div>
    <img
      class="navigation__add_icon"
      @click="() => addNote()"
      :src="require('@/assets/icons/add.svg')"
      alt="add"/>
  </div>
</template>

<script>
export default {
  computed: {
    notes() {
      return this.$store.getters['notes']
    }
  },
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

<style lang="scss" scoped>
.navigation {
  &__add_icon {
    cursor: pointer;
  }
  &__profile-container {
    display: flex;
    align-items: center;
    padding: 5px;
    margin: 5px;

    .profile_avatar {
      width: 50px;
      height: 50px;
      margin: 5px 10px 5px 5px;
    }
  }
}
</style>
