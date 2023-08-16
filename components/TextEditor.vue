<template>
  <div
    class="redactor"
    v-if="editor"
  >
    <div class="editor__tools">
      <button
        class="tools__element"
        :style="{ 'color':'white' }"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
        A
      </button>
      <button
        class="tools__element"
        @click="editor.chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
        :style="{ 'text-decoration': 'line-through', 'color': 'white', }"
      >
        a
      </button>
      <button
        class="tools__element"
        @click="editor.chain().focus().toggleUnderline().run()"
        :class="{ 'is-active': editor.isActive('underline') }"
        :style="{ 'text-decoration': 'underline', 'color': 'white' }"
      >
        a
      </button>
      <button
        class="tools__element"
        @click="editor.chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
        :style="{ 'font-style': 'italic', 'color': 'white' }"
      >
        a
      </button>
      <button
        class="tools__element"
        @click="editor.chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
        :style="{ 'color': 'white', 'font-weight': 'bold' }"
      >
        a
      </button>
      <img
        alt="bl"
        class="tools__element"
        :src="require('@/assets/icons/list.png')"
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
      />
      <img
        alt="jL"
        class="tools__element"
        :src="require('@/assets/icons/align-left.png')" @click="editor.chain().focus().setTextAlign('left').run()"
        :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
      />
      <img
        alt="jC"
        class="tools__element"
        :src="require('@/assets/icons/align-center.png')"
        @click="editor.chain().focus().setTextAlign('center').run()"
        :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
      />
      <img
        alt="jR"
        class="tools__element"
        :src="require('@/assets/icons/align-right.png')"
        @click="editor.chain().focus().setTextAlign('right').run()"
        :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
      />
      <img
        alt="nL"
        class="tools__element"
        :src="require('@/assets/icons/numbered-list.png')"
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }"
      />
      <span :style="{ 'text-align': 'center', 'color': 'pink' }">
        a
      </span>
      <input
        id="input"
        type="color"
        @input="editor.chain().focus().setColor($event.target.value).run()"
        :value="editor.getAttributes('textStyle').color"
      >
      <span
        :style="{ 'text-align': 'center', 'color': 'white', 'background-color': 'rgba(107, 48, 236, 1)', 'opacity': '0.7' }">
            a
          </span>
      <input
        id="input"
        type="color"
        @input="editor.chain().focus().toggleHighlight({color: `${$event.target.value}`}).run()"
        :value="editor.getAttributes('highlight').color"
      >
      <img
        alt="addYoutube"
        class="tools__element"
        :src="require('@/assets/icons/youtube.png')"
        @click="addVideo"
      />
    </div>
    <editor-content
      :editor="editor"/>
  </div>
</template>

<script>
import {Editor, EditorContent} from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import Color from "@tiptap/extension-color"
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import TextAlign from "@tiptap/extension-text-align"
import Bold from "@tiptap/extension-bold"
import Typography from "@tiptap/extension-typography"
import Italic from "@tiptap/extension-italic"
import Highlight from "@tiptap/extension-highlight"
import FontFamily from "@tiptap/extension-font-family"
import Youtube from "@tiptap/extension-youtube"
import Dropcursor from "@tiptap/extension-dropcursor"
import Underline from "@tiptap/extension-underline"
import Heading from "@tiptap/extension-heading"
import OrderedList from "@tiptap/extension-ordered-list"
import Strike from "@tiptap/extension-strike"
import BulletList from "@tiptap/extension-bullet-list"

export default {
  components: {
    EditorContent
  },

  props: {
    value: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      editor: null,
      highlightColor: true
    }
  },

  methods: {
    addVideo() {
      const url = prompt('Enter YouTube URL')

      this.editor.commands.setYoutubeVideo({
        src: url,
        width: Math.max(320, parseInt(this.width, 10)) || 640,
        height: Math.max(180, parseInt(this.height, 10)) || 480,
      })
    },

  },

  watch: {
    value(value) {
      const isSame = this.editor.getHTML() === value
      if (isSame) {
        return
      }
      this.editor.commands.setContent(value, false)
    },
  },

  mounted() {
    this.editor = new Editor({
      content: this.value,
      extensions: [
        StarterKit.configure({
          history: false
        }),
        Bold,
        BulletList,
        Color,
        Document,
        Dropcursor,
        FontFamily,
        Heading.configure({
          levels: [1, 2]
        }),
        Highlight.configure({multicolor: true}),
        Italic,
        OrderedList.configure({
          itemTypeName: 'listItem',
          keepMarks: true,
          keepAttributes: true
        }),
        Paragraph,
        Strike,
        Text,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        TextStyle,
        Typography,
        Underline,
        Youtube.configure({
          inline: false,
          width: 480,
          height: 320,
          autoplay: true
        })
      ],
      onUpdate: () => {
        this.$emit('input', this.editor.getHTML())
      },
    })
  },

  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>

<style lang="scss">
@import "@/assets/style/variables";

.redactor {
  height: 100vh;
  padding: 10px;
  overflow: hidden;

  .editor__tools {
    height: auto;
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 7px 5px;
    background-color: $light-grey;
    border-radius: 10px;

    @media (max-width: 2000px) {
      width: 50%;
    }
    @media (max-width: 1400px) {
      width: 60%;
    }
    @media (max-width: 1200px) {
      width: 70%;
    }
    @media (max-width: 992px) {
      width: 100%;
    }

    .tools__element {
      background-color: transparent;
      margin-right: 5px;
      height: 30px;
      border: none;
      cursor: pointer;
      padding: 5px;
    }
  }

  .ProseMirror {
    outline: none;
    padding: 10px;
    height: 100%;
  }
}

#input {
  background-color: transparent;
  width: 25px;
  height: 25px;
  border: none;
  cursor: pointer;
}

#input::-webkit-color-swatch {
  border-radius: 20%;
  border: none;
}

</style>
