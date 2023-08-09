<template>
  <div class="main">
    <Navigation class="main__navigation"/>
    <div class="main__content-holder">
      <NuxtLink to="/" class="content-holder__fmn">
        ForgetMe<strong class="content-holder__fmn_highlight">NOTE</strong>
      </NuxtLink>
      <Nuxt class="content-holder__children"/>
      <img class="content-holder_img" :src="require('@/assets/icons/logo.svg')" alt="logo"/>
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    await this.$store.dispatch('fetchNotes')
  }
}
</script>

<style lang="scss">
$font-basic: rgba(186, 184, 208, 0.6);
$font-bright: rgba(234, 232, 254, 1);
$highlights-violet: rgba(99, 55, 195, 1);
$grey: rgba(0, 0, 0, 0.25);
$light-grey: rgba(70, 67, 76, 1);
$dark-grey: rgba(54, 52, 59, 1);

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
  display: flex;

  &__navigation {
    width: 15%;
    background-color: $light-grey;
  }

  &__content-holder {
    position: relative;
    width: 85%;
    height: 100vh;
    background-color: $dark-grey;
  }
}

.content-holder {
  &__children {
    padding-top: 100px;
  }

  &_img {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }

  &__fmn {
    position: absolute;
    right: 10px;
    color: $font-bright;
    font-size: 20px;
    padding: 25px;

    &_highlight {
      color: $highlights-violet;
    }
  }
}
</style>
