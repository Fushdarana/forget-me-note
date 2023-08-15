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
    >
      <NavigationNotes
        v-for="note in notes"
        :note="note"
        class="navigation__note"
      />
    </div>
    <div
      class="navigation__add_icon">
      <img
        @click="() => addNote()"
        :src="require('@/assets/icons/add.svg')"
        alt="add"
        class="addicon"
      />
    </div>
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
  position: relative;

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

.navigation__notes-container {
  background-color: rgba(0, 0, 0, 0.25);
  height: auto;
  margin: 10px;
  border-radius: 10px;
  padding: 10px;
  transition: all;
}

.navigation__note {
  padding: 10px;

}

.navigation__note:hover {
  color: rgba(99, 55, 195, 1);
  border: 1px solid rgba(99, 55, 195, 1);
  border-radius: 10px;
  transition-duration: 1s;
}

.navigation__add_icon {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
}

.addicon {
  position: fixed;
  bottom: 20px;
}
</style>
