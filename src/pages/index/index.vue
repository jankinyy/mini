<template>
  <view>
    <Navbar />
    <scroll-view scroll-y>
      <Carousel :banners="banners" height="200px" />
      <CateScroll :category="category" />
      <!--  热门推荐 -->
      <view class="panel recommend">
        <view class="item" v-for="item in hots" :key="item.id">
          <view class="title">
            {{ item.title }}<text>{{ item.alt }}</text>
          </view>
          <navigator
            hover-class="none"
            :url="`/pages/recommend/index?type=${item.type}`"
            class="cards"
          >
            <image
              mode="aspectFit"
              v-for="img in item.pictures"
              :key="img"
              :src="img"
            ></image>
          </navigator>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
<script>
import Navbar from "./components/Navbar.vue";
import { getBannersAPI, getCategoryAPI, getHotsAPI } from "@/api/home";
export default {
  components: { Navbar },
  data() {
    return {
      banners: [],
      category: [],
      hots: [],
    };
  },
  onLoad() {
    this.getBanners();
    this.getCategory();
    this.getHots();
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
    async getHots() {
      const { result } = await getHotsAPI();
      this.hots = result;
      console.log(this.hots, "人气推荐");
    },
  },
};
</script>
<style scoped>
</style>