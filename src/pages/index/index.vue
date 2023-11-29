<template>
  <view class="content">
    <Navbar />
    <scroll-view scroll-y class="main">
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


<style lang="scss" scoped>
.content {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.main {
  flex: 1;
  overflow: hidden;
  background-color: #f7f7f8;
}
/* 公共面板 */
.panel {
  margin: 20rpx 20rpx 0;
  border-radius: 10rpx;
  background-color: #fff;
  .title {
    display: flex;
    align-items: center;
    padding: 24rpx 24rpx 0;
    font-size: 32rpx;
    color: #262626;
    position: relative;
    text {
      font-size: 24rpx;
      color: #7f7f7f;
      margin-left: 18rpx;
    }
  }
  .more {
    position: absolute;
    right: 24rpx;
    font-size: 26rpx;
    color: #7f7f7f;
  }
  .cards {
    display: flex;
  }
  .name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
/* 推荐专区 */
.recommend {
  display: flex;
  flex-wrap: wrap;
  .item {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 254rpx;
    border-right: 1rpx solid #eee;
    border-top: 1rpx solid #eee;
    &:nth-child(2n) {
      border-right: 0 none;
    }
    &:nth-child(-n + 2) {
      border-top: 0 none;
    }
  }
  .cards {
    flex: 1;
    padding: 15rpx 20rpx;
    justify-content: space-between;
    image {
      width: 48%;
    }
  }
}

/* 新鲜好物 */
.fresh {
  min-height: 320rpx;
  .price {
    line-height: 1;
    text-align: left;
    font-size: 26rpx;
    color: #cf4444;
  }
  .small {
    font-size: 80%;
  }
}
.fresh .cards navigator,
.brands .cards navigator {
  width: 25%;
  padding: 15rpx 20rpx 20rpx;
  line-height: 1;
  text-align: center;
}
.fresh image,
.brands image {
  width: 126rpx;
  height: 126rpx;
}
.fresh .name,
.brands .name {
  margin: 20rpx 0 16rpx;
  font-size: 24rpx;
  color: #262626;
}
.brands {
  .price {
    font-size: 24rpx;
    color: #999;
  }
}
</style>
