<template>
  <NuxtLink :to="`/${note.id}`" class="note">
    <span>
    {{ note.title }}
    </span>
    <img
      v-if="note.liked"
      :src="require('@/assets/icons/passion.png')"
      alt="like"
    />
  </NuxtLink>
</template>

<script>
export default {
  props: {
    note: {
      title: String,
      liked: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
.note {
  display: flex;
}
</style>
