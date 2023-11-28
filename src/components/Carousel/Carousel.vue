<template>
  <swiper
    :style="{ height: height }"
    class="carousel"
    autoplay
    indicator-dots
    circular
  >
    <swiper-item v-for="item in banners" :key="item.id">
      <image mode="aspectFill" class="image" :src="item.imgUrl"></image>
    </swiper-item>
  </swiper>
</template>

<script>
export default {
  props: {
    banners: Array,
    height: String,
  },
};
</script>

<style scoped>
.carousel {
  height: 100%;
}
.image {
  width: 100%;
  height: 100%;
}
</style>