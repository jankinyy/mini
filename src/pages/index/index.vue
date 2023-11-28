<template>
  <view>
    <Navbar />
    <Carousel :banners="banners" height="200px" />
    <CateScroll :category="category" />
  </view>
</template>
<script>
import Navbar from "./components/Navbar.vue";
import { getBannersAPI, getCategoryAPI } from "@/api/home";
export default {
  components: { Navbar },
  data() {
    return {
      banners: [],
      category: [],
    };
  },
  onLoad() {
    this.getBanners();
    this.getCategory();
  },
  methods: {
    async getBanners() {
      const { result } = await getBannersAPI();
      this.banners = result;
      console.log(this.banners, "轮播图");
    },
    async getCategory() {
      const { result } = await getCategoryAPI();
      this.category = result;
      console.log(this.category, "前台类目");
    },
  },
};
</script>
<style scoped>
</style>