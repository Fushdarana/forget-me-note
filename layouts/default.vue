<template>
  <div class="main">
    <Navigation
      class="main__navigation"/>
    <div class="main__content-holder">
      <NuxtLink
        to="/"
        class="content-holder__fmn">
        ForgetMe<strong class="content-holder_highlight">NOTE</strong>
      </NuxtLink>
      <div
        :style="{'display':'flex'}">
        <img
          class="burger__menu"
          alt="menu"
          @click="handleNavMobile()"
          :src="require('@/assets/icons/menu.png')">
        <div
          class="burger__menu_notes"
          :class="{ opened: isOpened }">
          <NavigationNotes
            v-for="note in notes"
            :note="note"
            class="burger__menu_note"
            :style="{'padding':'10px'}"/>
          <AddNote
            :style="{'width': '35px'}"/>
          <img
            @click="closeMenu()"
            :src="require('@/assets/icons/close.png')"
            alt="close">
        </div>
      </div>
      <Nuxt class="content-holder__children"/>
      <img
        class="content-holder_img"
        :src="require('@/assets/icons/logo.svg')" alt="logo"/>
    </div>
  </div>
</template>

<script>
import NavigationNotes from "@/components/NavigationNotes.vue"
import AddNote from "@/components/AddNote.vue"

export default {
  async fetch() {
    await this.$store.dispatch('fetchNotes')
  },
  computed: {
    notes() {
      return this.$store.getters['notes']
    }
  },
  data() {
    return {
      isOpened: false
    }
  },
  methods: {
    handleNavMobile() {
      this.isOpened = !this.isActive
    },
    closeMenu() {
      this.isOpened = false
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/style/variables";

* {
  a {
    text-decoration: none;
  }

  color: $font-basic;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main {
  min-height: 100vh;
  display: flex;

  &__navigation {
    @media (max-width: 1200px) {
      display: none;
    }
    height: auto;
    width: 15%;
    background-color: $light-grey;
  }

  &__content-holder {
    @media (max-width: 1200px) {
      width: 100%;
    }
    height: auto;
    position: relative;
    width: 85%;
    background-color: $dark-grey;

    .content-holder__children {
      padding-top: 100px;
      @media (max-width: 1200px) {
        padding-top: 10px;
      }
    }

    .content-holder_img {
      position: fixed;
      bottom: 10px;
      right: 10px;
    }

    .content-holder__fmn {
      position: absolute;
      right: 10px;
      color: $font-bright;
      font-size: 20px;
      padding: 25px;


      .content-holder_highlight {
        color: $highlights-violet;
      }
    }

    .burger__menu {
      display: none;
      @media (max-width: 1200px) {
        display: block;
        height: 70px;
        padding: 20px;
        cursor: pointer;
      }
    }
  }
}

.burger__menu_notes {
  display: none;
}

.opened {
  display: block;
  text-align: center;
  position: absolute;
  padding: 15px;
  margin: 4px;
  border-radius: 10px;
  background-color: $grey2;
  z-index: 9;
}
</style>
