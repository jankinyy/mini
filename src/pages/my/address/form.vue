<template>
  <view class="viewport">
    <!-- 地址信息 -->
    <view class="form">
      <view class="form-item">
        <text class="label">姓名</text>
        <input
          v-model="form.receiver"
          placeholder-style="color: #888"
          placeholder="请填写收货人姓名"
        />
      </view>
      <view class="form-item">
        <text class="label">手机号码</text>
        <input
          v-model="form.contact"
          placeholder-style="color: #888"
          placeholder="请填写收货人手机号码"
        />
      </view>
      <view class="form-item">
        <text class="label">省/市/县 (区)</text>
        <picker @change="onChangeRegion" mode="region">
          <view v-if="form.fullLocation" class="region">
            {{ form.fullLocation }}
          </view>
          <view v-else class="placeholder"> 请填写收货人所在城市 </view>
        </picker>
      </view>
      <view class="form-item">
        <text class="label">详细地址</text>
        <input
          v-model="form.address"
          placeholder-style="color: #888"
          placeholder="街道、楼牌号信息"
        />
      </view>
      <view class="form-item">
        <text class="label">设置默认地址</text>
        <switch
          @change="onChangeDefault"
          :checked="form.isDefault === 1"
          color="#27ba9b"
        />
      </view>
    </view>
    <!-- 提交按钮 -->
    <view class="button" @tap="onSubmitForm"> 保 存 </view>
  </view>
</template>
<script>
import { addAddressAPI } from "@/api/address";
export default {
  data() {
    return {
      form: {
        /** * 详细地址 */
        address: "",
        /** * 联系方式 */
        contact: "",
        /** * 是否为默认，1为是，0为否 */
        isDefault: 0,
        /** * 收货人姓名 */
        receiver: "",
        /** 省市县 */
        fullLocation: "",
        /** * 所在区/县编码 */
        countyCode: "",
        /** * 所在城市编码 */
        cityCode: "",
        /** * 所在省份编码 */
        provinceCode: "",
      },
    };
  },

  methods: {
    onChangeDefault(e) {
      this.form.isDefault = e.detail.value ? 1 : 0;
    },
    onChangeRegion(e) {
      const { code, value, postcode } = e.detail;
      this.form.fullLocation = value.join("");
      this.form.provinceCode = code[0];
      this.form.cityCode = code[1];
      this.form.countyCode = code[2];
    },
    async onSubmitForm() {
      await addAddressAPI(this.form);
      uni.showToast({
        title: "保存成功",
        icon: "success",
      });
      setTimeout(() => {
        uni.navigateBack();
      }, 1500);
    },
  },
};
</script>
<style lang="scss">
page {
  background-color: #f4f4f4;
}
.form {
  margin: 20rpx 20rpx 0;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;
  .form-item {
    display: flex;
    min-height: 96rpx;
    line-height: 46rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;
    position: relative;
    &:last-child {
      border: none;
    }
    .label {
      width: 200rpx;
      color: #333;
    }
    input {
      flex: 1;
      display: block;
      height: 46rpx;
    }
    switch {
      position: absolute;
      right: -10rpx;
      transform: scale(0.7) translateY(-8px);
    }
    picker {
      flex: 1;
    }
    .region {
      color: #333;
    }
    .placeholder {
      color: #888;
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