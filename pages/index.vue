<template>
  <div class="container">
    <div class="container__content">
      <div
        :style="{ 'text-align': 'center', 'font-size': '20px', 'padding-top': '20px' }">
        Заметки
      </div>
      <div class="content__group_wrapper">
        <span class="content__group-name">
          Группа
        </span>
        <div class="content__group">
          <img
            class="group_scrollLeft"
            @click="() => scrollTo('LEFT')"
            :src="require('@/assets/icons/arrow.svg')"
            alt="btn"
          />
          <div class="container__cards">
            <Card
              v-for="note of notes"
              :key="note.id"
              :note="note"
            />
          </div>
          <img
            class="group_scrollRight"
            @click="() => scrollTo('RIGHT')"
            :src="require('@/assets/icons/arrow.svg')"
            alt="btn"
          />
        </div>
      </div>
      <div class="content__favs_wrapper">
        <span class="content__group-name">
          Избранное
        </span>
        <div class="content__favs">
          <div class="container__cards_favs">
            <Card
              v-for="fav of favs"
              :key="fav.id"
              :note="fav"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  computed: {
    favs() {
      return this.$store.getters['favs']
    },
    notes() {
      return this.$store.getters['notes']
    }
  },
  methods: {
    scrollTo(direction) {
      const el = document.querySelector('.container__cards')
      if (direction === 'LEFT') {
        el.scrollLeft -= el.clientWidth
      } else {
        el.scrollLeft += el.clientWidth
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;

  &__content {
    background-color: rgba(9, 8, 13, 1);
    height: 100%;

    .content__group {
      display: flex;
      padding: 15px;
    }

    .content__group-name {
      font-size: 20px;
      margin: 15px 65px;
    }

    .content__group_wrapper {
      padding-top: 30px;
    }

    .content__favs_wrapper {
      display: flex;
      flex-wrap: wrap;
      padding-top: 30px;
    }

    .group_scrollLeft {
      margin-right: 15px;
      margin-left: 15px;
      cursor: pointer;
    }

    .group_scrollRight {
      transform: scaleX(-1);
      margin-left: 15px;
      margin-right: 15px;
      cursor: pointer;
    }
  }

  .content__favs {
    display: flex;
    flex-wrap: wrap;
    padding: 0 75px;
    margin-bottom: 30px;
  }

  &__cards {
    display: flex;
    overflow-x: scroll;
    scroll-behavior: smooth;
  }

  &__cards::-webkit-scrollbar {
    display: none;
  }

  .container__cards_favs {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
}

</style>
