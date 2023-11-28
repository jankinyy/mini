<template>
  <view class="category-head-mutli">
    <scroll-view scroll-x @scroll="onScroll">
      <view class="scroll-wrap">
        <view class="category-head-mutli-item">
          <navigator v-for="index in [0, 1, 2, 3, 4, 5, 6, 7]" :key="index">
            <image mode="widthFix" :src="category[index].icon" />
            <text>{{ category[index].name }}</text>
          </navigator>
        </view>
        <view class="category-head-mutli-item">
          <navigator v-for="index in [8, 9]" :key="index">
            <image mode="widthFix" :src="category[index].icon" />
            <text>{{ category[index].name }}</text>
          </navigator>
        </view>
      </view>
    </scroll-view>
    <view class="scroll-bar">
      <view
        class="scroll-bar-inner"
        :style="{ transform: `translateX(${left}%)` }"
      ></view>
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["safeArea"]),
  },
  props: {
    category: Array,
  },
  data() {
    return {
      left: 0,
    };
  },
  methods: {
    onScroll(e) {
      console.log(e, "滚动视图");
      this.left = (e.detail.scrollLeft / this.safeArea.width) * 100;
      console.log(this.left, "滚动距离");
    },
  },
};
</script>

<style lang="scss">
.category-head-mutli {
  background-color: #f7f7f8;
  position: relative;
  padding-bottom: 30rpx;
  .scroll-wrap {
    display: flex;
    width: 200%;
  }
  .category-head-mutli-item {
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    navigator {
      text-align: center;
      width: 20%;
      padding: 15rpx;

      image {
        width: 100rpx;
        display: block;
        margin: 0 auto;
      }
      text {
        font-size: 26rpx;
        color: #666;
      }
    }
  }
  .scroll-bar {
    position: absolute;
    bottom: 15rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 100rpx;
    height: 8rpx;
    background-color: #e2e2e2;
    z-index: 200;
    .scroll-bar-inner {
      width: 50%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background-color: #00c09b;
    }
  }
}
</style>