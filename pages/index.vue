<template>
  <div class="container">
    <div class="container__content">
      <div
        :style="{ 'text-align': 'center', 'font-size': '20px', 'padding-top': '20px' }">
        Заметки
      </div>
      <div class="content__group_wrapper">
        <span class="content__title">Группа</span>
        <div class="content__group">
          <div class=""></div>
          <img
            class="group_scrollLeft"
            @click="() => scrollTo('LEFT')"
            :src="require('@/assets/icons/arrow.svg')"
            alt="btn"
          />
          <div class="group__cards-container">
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
        <span class="content__title">Избранное</span>
        <div class="favs__cards-container">
          <Card
            v-for="fav of favs"
            :key="fav.id"
            :note="fav"
            :style="{'margin':'5px'}"
          />
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
      const el = document.querySelector('.group__cards-container')
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
@import "@/assets/style/variables";

.container {
  height: 100%;

  &__content {
    background-color: $custom-black;
    height: 100%;

    .content__group_wrapper {
      padding-top: 15px;

      .content__group {
        display: flex;
        padding: 20px 20px;

        .group_scrollLeft {
          margin-right: 15px;
          margin-left: 15px;
          cursor: pointer;
        }

        .group__cards-container {
          display: flex;
          overflow-x: scroll;
          scroll-behavior: smooth;

          &::-webkit-scrollbar {
            display: none;
          }
        }

        .group_scrollRight {
          transform: scaleX(-1);
          margin-left: 15px;
          margin-right: 15px;
          cursor: pointer;
        }
      }
    }

    .content__favs_wrapper {
      .favs__cards-container {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        padding-top: 15px;
      }
    }
  }

  .content__title {
    font-size: 20px;
    margin: 65px;
  }
}

</style>
