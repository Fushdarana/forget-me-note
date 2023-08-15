<template>
  <div class="page">
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
        alt="close"/>
    </div>
    <div class="page__content-wrapper">
      <div class="content-wrapper__actions">
        <button
          @click="() => changeNote()"
          class="actions__btn"
        >
          Сохранить
        </button>
        <button
          class="actions__btn"
          @click="() => deleteNote()"
        >
          Удалить
        </button>
        <button
          @click="addCover()"
          class="actions__btn"
        >
          Обложка
        </button>
        <img
          class="actions__like"
          :class="{ active: !this.note.liked }"
          :src="require('@/assets/icons/passion.png')"
          @click="() => setLiked()"
          alt="like"
        />
      </div>
      <div class="redactor_container">
        <TextEditor
          :imgURL="note"
          :value="note.content"
          @input="(v) => note.content = v"
          class="textEditor"
        />
        <div
          class="imageBlock">
          {{ note.created_at }}
          <div class="img_container">
            <img
              :src="note.img"
              alt="photo"
              class="img"
            />
          </div>
          <div>
            <img
              alt="addImg"
              :src="require('@/assets/icons/add-image.png')"
              @click="addImg()"
            />
          </div>
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
      note: {
        id: 0,
        img: ''
      }
    }
  },
  methods: {
    addImg() {
      const url = window.prompt('URL')
      return this.note.img = url
    },
    addCover() {
      const url = window.prompt('URL')
      return this.note['img'] = url
    },
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

.page {
  height: auto;

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
    height: auto;
    background-color: #09080D;
  }
}

.content-wrapper__actions {
  margin-right: 10px;
  text-align: end;
  padding: 10px;

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

.redactor_container {
  display: grid;
  grid-template-columns: 2fr 1fr;
}

.img_container {
  margin-top: 10px;
  width: 500px;
  height: auto;
  max-height: 700px;
  overflow: hidden;
  border-radius: 10px;
}

</style>
