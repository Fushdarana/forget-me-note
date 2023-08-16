<template>
  <div class="page">
    <div class="page__title-wrapper">
      <input
        class="title"
        type="text"
        v-model="note.title"
        :placeholder="note.title"/>
      <img
        @click="() => this.$router.push('/')"
        :src="require('@/assets/icons/close.png')"
        :style="{'cursor':'pointer'}"
        alt="close"/>
    </div>
    <div class="page__content-wrapper">
      <TextEditor
        :imgURL="note"
        :value="note.content"
        @input="(v) => note.content = v"/>
      <div
        class="actions__container">
        <div class="actions">
          <button
            @click="() => changeNote()"
            class="actions__btn">
            Сохранить
          </button>
          <button
            class="actions__btn"
            @click="() => deleteNote()">
            Удалить
          </button>
          <button
            @click="() => addCover()"
            class="actions__btn">
            Обложка
          </button>
          <img
            class="actions__like"
            :class="{ active: !this.note.liked }"
            :src="require('@/assets/icons/passion.png')"
            @click="() => setLiked()"
            alt="like"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextEditor from "~/components/TextEditor.vue";

export default {
  components: {
    TextEditor
  },
  data() {
    return {
      note: {}
    }
  },
  methods: {
    addCover() {
      const url = window.prompt('URL')
      if (url) {
        this.note.img = url
        }
    },
    async changeNote() {
      await this.$axios.$put('http://localhost:4000/notes/' + this.$route.params.id, this.note);
      await this.$store.dispatch('fetchNotes')
    },
    async deleteNote() {
      await this.$axios.$delete('http://localhost:4000/notes/' + this.$route.params.id)
      await this.$store.dispatch('fetchNotes')
      await this.$router.push('/')
    },
    async setLiked() {
      this.note = await this.$axios.$put('http://localhost:4000/notes/' + this.$route.params.id,
        {
          id: this.note.id,
          title: this.note.title,
          content: this.note.content,
          created_at: this.note.created_at,
          img: this.note.img,
          liked: !this.note.liked
        })
      await this.$store.dispatch('fetchNotes')
    }
  },
  async fetch() {
    this.note = await this.$axios.$get('http://localhost:4000/notes/' + this.$route.params.id)
  }
}
</script>

<style lang="scss">
@import "@/assets/style/variables";

.page {
  height: auto;

  &__title-wrapper {
    background-color: $custom-black;
    border-radius: 0 10px 0 0;
    width: 315px;
    display: flex;
    justify-content: space-around;
    padding: 10px;

    .title {
      border: none;
      outline: none;
      width: 315px;
      background-color: transparent;
    }
  }

  &__content-wrapper {
    height: auto;
    background-color: $custom-black;
    display: grid;
    grid-template-columns: 80% 20%;

    @media (max-width: 992px) {
      display: block;
    }

    .actions__container {
      height: auto;
      .actions {
        display: flex;
        justify-content: end;
        align-items: center;
        margin-right: 10px;
        padding: 10px;
        height: auto;

        @media (max-width: 992px) {
          justify-content: start;
        }
        .actions__btn {
          background-color: transparent;
          color: $font-basic;
          box-shadow: none;
          border-radius: 5px;
          cursor: pointer;
          border: none;
          margin: 5px;

          &:hover {
            color: $font-bright;
          }
        }
      }
    }
  }
}

.actions__like:hover {
  cursor: pointer;
  filter: invert(54%) sepia(12%) saturate(71%) hue-rotate(315deg) brightness(93%) contrast(77%);
}

.active {
  filter: invert(54%) sepia(12%) saturate(71%) hue-rotate(315deg) brightness(93%) contrast(77%);

  &:hover {
    filter: none;
  }
}
</style>
