<template>
  <div class="page">
    <TextEditor
      @input="(v) => note.content = v"
    />
    <div class="page__title-wrapper">
      <input
        class="title-wrapper_title"
        type="text"
        v-model="note.title"
        :placeholder="note.title"
      />
      <img
        @click="() => this.$router.push('/')"
        :src="require('@/assets/icons/close.png')"
        alt="like"/>
    </div>
    <div class="page__content-wrapper">
      <textarea
        class="content-wrapper__text"
        v-model="note.content"
        :placeholder="note.content"
        @click="() => adjustableTextArea()"
      />
      <div class="content-wrapper__actions">
        <div>
          {{ note.created_at }}</div>
        <button
          @click="() => changeNote()"
          class="actions__btn"
        >Сохранить
        </button>
        <button
          class="actions__btn"
          @click="() => deleteNote()"
        >
          Удалить
        </button>
        <img
          class="actions__like"
          :class="{ active: !this.note.liked }"
          :src="require('@/assets/icons/passion.png')"
          @click="() => setLiked()"
          alt="like"
        />
      </div>
      <img
        v-if="note.img"
        :src="`${note.img}`"
        alt="img"/>
      <img
        v-else
        :src="require('@/assets/pictures/rat.jpg')"
        alt="img"/>
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
      note: {
        id: 0
      }
    }
  },
  methods: {
    async changeNote() {
      let newVar = await this.$axios.$put('http://localhost:4000/notes/' + this.$route.params.id, this.note);
      console.log(newVar)
      await this.$store.dispatch('fetchNotes')
    },
    async deleteNote() {
      await this.$axios.$delete('http://localhost:4000/notes/' + this.$route.params.id)
      await this.$store.dispatch('fetchNotes')
      await this.$router.push('/')
    },
    adjustableTextArea() {
      const textarea = document.querySelector('textarea')
      textarea.addEventListener('keyup', e => {
        let scHeight = e.target.scrollHeight
        textarea.style.height = `${scHeight}px`
      })
    },
    async setLiked() {
      this.note = await this.$axios.$put('http://localhost:4000/notes/' + this.$route.params.id,
        {
          id: this.note.id,
          title: this.note.title,
          content: this.note.content,
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

.page {
  &__title-wrapper {
    background-color: #09080D;
    border-radius: 0 10px 0 0;
    width: 315px;
    display: flex;
    justify-content: space-around;
    padding: 10px;

    .title-wrapper_title {
      border: none;
      outline: none;
      width: 315px;
      background-color: transparent;
    }
  }

  &__content-wrapper {
    height: 100%;
    background-color: #09080D;

  }
}

.content-wrapper__actions {
  display: flex;
  justify-content: end;
  margin-right: 30px;
  .actions__btn {
    background-color: transparent;
    color: rgba(186, 184, 208, 0.4);
    box-shadow: none;
    border-radius: 5px;
    cursor: pointer;
    border: none;
    margin: 5px;
  }

  .actions__btn:hover {
    color: #BAB8D0; //поправить

  }
}

.content-wrapper__text {
  background-color: #09080D; //поправить
  resize: none;
  width: 700px;
  padding: 20px;
  outline: none;
  border: none;
  overflow-wrap: break-word;
  word-break: break-word;
  overflow: hidden;

}

.actions__like:hover {
  cursor: pointer;
  filter: invert(54%) sepia(12%) saturate(71%) hue-rotate(315deg) brightness(93%) contrast(77%);
}

.active {
  filter: invert(54%) sepia(12%) saturate(71%) hue-rotate(315deg) brightness(93%) contrast(77%)
}

.active:hover {
  filter: none;
}
</style>
