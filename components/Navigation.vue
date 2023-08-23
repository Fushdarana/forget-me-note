<template>
  <div class="navigation">
    <div class="navigation__profile-container">
      <img
        class="profile_avatar"
        :src="require('@/assets/avatars/mainIcon.png')"
        alt="icon"/>
      <span>Имя пользователя</span>
    </div>
    <div class="navigation__notes-container">
      <NavigationNotes
        v-for="note in notes"
        :note="note"
        class="navigation__note"
      />
    </div>

    <div class="navigation__add">
      <div class="add_icon">
        <AddNote />
      </div>
    </div>
  </div>
</template>

<script>
import AddNote from "@/components/AddNote.vue"
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
@import "@/assets/style/variables";

.navigation {
  position: relative;

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

  &__add_icon {
    cursor: pointer;
  }

  &__notes-container {
    background-color: $grey;
    height: auto;
    margin: 10px;
    border-radius: 10px;
    padding: 10px;
    transition: all;
    overflow: hidden;
    overflow-wrap: anywhere;

    .navigation__note {
      padding: 10px;
      width: 100%;

      &:hover {
        color: $highlights-violet;
        border: 1px solid rgba(99, 55, 195, 1);
        border-radius: 10px;
        transition-duration: 1s;
      }
    }
  }
  &__add {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;

    .add_icon{
      position: fixed;
      bottom: 20px;
    }
  }
}
</style>
