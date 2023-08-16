<template>
  <NuxtLink :to="`/${note.id}`"
            class="card"
            :style="{backgroundImage: `url(${note.img})`}">
    <div class="card__info">
      <span>{{ note.title }}</span>
      <span>{{ note.created_at }}</span>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    note: {
      title: String,
      created_at: String,
      img: String,
      content: String,
      liked: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables";

.card {
  min-width: 450px;
  max-width: 450px;
  height: 280px;
  background-position: 50%;
  position: relative;
  background-repeat: no-repeat;
  border-radius: 10px;
  margin: 0 6px;

  @media (max-width: 768px) {
    min-width: 300px;
  }

  &__info {
    background-color: #09080D;
    opacity: 90%;
    color: $font-basic;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 42px;
    border-radius: 0 20px 8px 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
  }

  span {
    background-color: transparent;
  }
}

</style>
