<template>
  <view class="viewport">
    <!-- 顶部背景 -->
    <view class="navbar" :style="{ paddingTop: safeArea.top + 'px' }">
      <view class="back icon-left" @click="onBack"></view>
      <view class="title">个人信息</view>
    </view>
    <scroll-view scroll-y>
      <!-- 头像 -->
      <view class="avatar">
        <image mode="aspectFill" :src="profile.avatar" @click="onUpLoadFile" />
        <text>点击修改头像</text>
      </view>
      <view class="form">
        <view class="form-item">
          <text class="label">账号</text>
          <!-- 账号名不能修改，用 text 组件展示 -->
          <text>{{ profile.account }}</text>
        </view>
        <view class="form-item">
          <text class="label">昵称</text>
          <!-- 输入框通过 v-model 双向绑定修改数据 -->
          <input v-model="profile.nickname" />
        </view>
        <view class="form-item">
          <text class="label">性别</text>
          <radio-group @change="changeRadio">
            <label class="radio">
              <radio
                value="男"
                color="#27ba9b"
                :checked="profile.gender === '男'"
              />
              男
            </label>
            <label class="radio">
              <radio
                value="女"
                color="#27ba9b"
                :checked="profile.gender === '女'"
              />
              女
            </label>
          </radio-group>
        </view>
        <view class="form-item">
          <text class="label">出生日期</text>
          <picker
            mode="date"
            start="1900-01-01"
            :end="end"
            @change="birthDayChange"
          >
            <view>{{ profile.birthday || "请选择日期" }}</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">城市</text>
          <picker mode="region" @change="regionChange">
            <view>{{ profile.fullLocation || "请选择城市" }}</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">职业</text>
          <!-- 输入框通过 v-model 双向绑定修改数据 -->
          <input placeholder="请填写职业" v-model="profile.profession" />
        </view>
        <!-- 提交按钮 -->
        <view class="button" @click="submit">保 存</view>
      </view>
    </scroll-view>
  </view>
</template>
<script>
import { mapState } from "vuex";
import { getProfileAPI, uploadPhotoAPI, updateProfileAPI } from "@/api/profile";
import dayjs from "dayjs";
export default {
  computed: {
    ...mapState(["safeArea"]),
  },
  data() {
    return {
      profile: {},
      end: dayjs().format("YYYY-MM-DD"),
    };
  },
  onLoad() {
    this.getProfile();
  },
  methods: {
    async getProfile() {
      const { result } = await getProfileAPI();
      console.log(result, "个人数据");
      this.profile = result;
    },
    onBack() {
      uni.navigateBack();
    },
    async onUpLoadFile() {
      const { tempFiles } = await uni.chooseImage({
        count: 1,
        mediaType: ["image"],
      });
      const { data } = await uploadPhotoAPI(tempFiles[0].path);

      this.profile.avatar = JSON.parse(data).result.avatar;
    },
    async changeRadio(e) {
      console.log(e.detail, "更新数据");
      this.profile.gender = e.detail.value;
    },
    async submit() {
      await updateProfileAPI(this.profile);
      uni.showToast({
        title: "保存成功",
        icon: "success",
        duration: 1500,
      });
      setTimeout(() => {
        uni.navigateBack();
      }, 3000);
    },
    birthDayChange(e) {
      console.log(e.detail, "生日数据");
      this.profile.birthday = e.detail.value;
    },
    regionChange(e) {
      console.log(e.detail, "地区数据");
      const { value, code } = e.detail;

      this.profile.fullLocation = value.join(" ");
      console.log(this.profile.fullLocation, "拼接");
      this.profile.provinceCode = code[0];
      this.profile.cityCode = code[1];
      this.profile.countyCode = code[2];
    },
  },
};
</script>
<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  background-color: #f4f4f4;
}
.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-image: url(https://static.botue.com/erabbit/static/images/order_bg.png);
  background-size: auto 392rpx;
  background-repeat: no-repeat;
}
.navbar {
  .title {
    height: 40px;
    line-height: 32px;
    text-align: center;
    font-size: 17px;
    font-weight: 500;
    color: #fff;
  }
  .back {
    position: absolute;
    left: 20rpx;
    top: 22px;
    font-size: 23px;
    z-index: 9;
    color: #fff;
  }
}
.avatar {
  text-align: center;
  padding: 20rpx 0 40rpx;
  image {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
  }
  text {
    display: block;
    padding-top: 20rpx;
    line-height: 1;
    font-size: 26rpx;
    color: #fff;
  }
}
.form {
  margin: 20rpx 20rpx 0;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;
  .form-item {
    display: flex;
    height: 96rpx;
    line-height: 46rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;
    &:last-child {
      border: none;
    }
    .label {
      width: 180rpx;
      color: #333;
    }
    input {
      flex: 1;
      display: block;
      height: 46rpx;
    }
    .radio {
      display: inline-block;
      height: 46rpx;
      margin-right: 20rpx;
      vertical-align: middle;
    }
    radio {
      transform: scale(0.7) translateY(-2px);
    }
    picker {
      flex: 1;
    }
  }
}
.button {
  height: 80rpx;
  text-align: center;
  line-height: 80rpx;
  margin: 30rpx 20rpx;
  color: #fff;
  border-radius: 80rpx;
  font-size: 30rpx;
  background-color: #27ba9b;
}
</style>