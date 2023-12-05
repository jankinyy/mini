<template>
  <view class="viewport">
    <!-- 推荐封面 -->
    <view class="cover">
      <image :src="bannerPicture" />
    </view>
    <!-- tab栏 -->
    <view class="tabs">
      <text
        @click="activeId = item.id"
        class="text"
        :class="{ active: item.id === activeId }"
        v-for="item in subTypes"
        :key="item.id"
      >
        {{ item.title }}
      </text>
    </view>
    <!-- 列表内容 -->
    <!-- 列表内容 -->
    <!-- 有多少个子分类就有多少个列表, 由当前激活项决定哪个应该显示 -->
    <!-- 数据结构如下 -->
    <!-- goodsItems{
      分类a Id: {items: Array},
      分类b Id: {items: Array}
    } -->
    <!-- 对于对象的 v-for 遍历 -->
    <!-- 可以得到的参数分别是, 数据本身, 属性名 key, 下标 -->
    <scroll-view
      scroll-y
      class="scroll-view"
      v-for="(type, id) in goodsItems"
      :key="id"
      v-show="activeId === id"
    >
      <view class="goods">
        <navigator
          hover-class="none"
          class="navigator"
          v-for="goods in type.items"
          :key="goods.id"
          :url="`/pages/goods/index?id=${goods.id}`"
        >
          <image class="thumb" :src="goods.picture"></image>
          <view class="name ellipsis">{{ goods.name }}</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ goods.price }}</text>
          </view>
        </navigator>
      </view>
      <view class="loading">正在加载...</view>
    </scroll-view>
  </view>
</template>
<script>
import { getRecomendsAPI } from "@/api/home";

// 1. 声明对象`urlMap`，保存title与url等信息
const urlMap = {
  1: { title: "特惠推荐", url: "/home/preference/mutli" },
  2: { title: "爆款推荐", url: "/home/inVogue/mutli" },
  3: { title: "一站买全", url: "/home/oneStop/mutli" },
  4: { title: "新鲜好物", url: "/home/new/mutli" }, // 后端未提供，暂用新鲜好物url
  5: { title: "新鲜好物", url: "/home/new/mutli" },
};

export default {
  data() {
    return {
      currentItem: {},
      bannerPicture: "",
      goodsItems: {},
      subTypes: [],

      activeId: "",
    };
  },
  async onLoad({ type }) {
    // 3. 根据type的值，从urlMap中取出信息
    this.currentItem = urlMap[type];
    // 4. 动态设置页面title
    uni.setNavigationBarTitle({ title: this.currentItem.title });

    const { result } = await getRecomendsAPI(this.currentItem.url);
    console.log(result, "推荐数据");
    const { bannerPicture, goodsItems, subTypes } = result;
    // 4. 保存数据
    console.log(goodsItems, "商品列表");
    this.bannerPicture = bannerPicture;
    this.goodsItems = goodsItems;
    this.subTypes = subTypes;

    this.activeId = this.subTypes[0].id;
  },
};
</script>
