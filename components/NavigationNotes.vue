<template>
  <NuxtLink
    :to="`/${note.id}`"
    :style="{'display' : 'flex'}"
  >
    <img
      v-if="note.liked"
      :src="require('@/assets/icons/likeicon.png')"
      alt="like"
      :style="{'max-height': '20px', 'margin-right': '5px'}"
    />
    <span>
    {{ note.title }}
    </span>

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
