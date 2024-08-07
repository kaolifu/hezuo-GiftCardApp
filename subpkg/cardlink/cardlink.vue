<template>
  <view class="container">
    <!-- 卡片信息 -->
    <uni-section title="卡片信息" type="line">
      <view class="info-image">
        <!-- <image src="../../static/itemPics/mango.jpg"></image> -->
      </view>
      <view class="info-item">
        <view class="info-item-title">卡片名称</view>
        <input type="text" value="攀研芒果礼品卡" disabled class="disabled" />
      </view>
      <view class="info-item">
        <view class="info-item-title">卡片ID</view>
        <input type="text" value="jlksdjfion209ids8" disabled class="disabled" />
      </view>
      <view class="info-item">
        <view class="info-item-title">卡片内容</view>
        <input type="text" value="瑞雪 * 3 / 草莓 * 2 / 咖啡 * 3 / 芒果 * 2 / 红米 * 3" disabled class="disabled" />
      </view>
    </uni-section>

    <!-- 送卡还是兑换 -->
    <uni-section title="用户身份" type="line">
      <uni-data-select v-model="value" :localdata="range" @change="change"></uni-data-select>
    </uni-section>

    <!-- 用户信息 -->
    <uni-section title="用户信息" type="line">
      <view class="address-button-box" v-if="JSON.stringify(address) === '{}'">
        <button type="primary" size="mini" plain="true" @click="chooseAddress">请绑定用户信息</button>
      </view>
      <view class="address-info-box" v-else>
        <view class="info-item">
          <view class="info-item-title">联系方式</view>
          <input type="text" :value="address.telNumber" disabled class="disabled" />
        </view>
        <view class="info-item">
          <view class="info-item-title">用户名</view>
          <input type="text" :value="address.userName" disabled class="disabled" />
        </view>
        <view class="info-item" v-show="userState === 1">
          <view class="info-item-title">联系地址</view>
          <input type="text" :value="addstr" disabled class="disabled" />
        </view>
      </view>
    </uni-section>
    <button type="primary" @click="gotoCards" v-show="JSON.stringify(address) !== '{}'">绑定礼品卡</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      value: null,
      range: [
        { value: 0, text: '我想送出卡片' },
        { value: 1, text: '我想兑换卡片' }
      ],
      // 用户是送卡还是兑换，0为送卡，1为兑换
      userState: null,
      address: {}
    };
  },
  computed: {
    addstr() {
      if (!this.address.provinceName) return '';
      return this.address.provinceName + this.address.cityName + this.address.countyName + this.address.detailInfo;
    }
  },
  methods: {
    change(e) {
      this.userState = e;
      console.log('userState:', this.userState);
    },
    gotoCards() {
      uni.switchTab({
        url: '/pages/cards/cards'
      });
    },
    async chooseAddress() {
      let err = undefined;
      const res = await uni.chooseAddress().catch((err) => err);
      if (res.errMsg === 'chooseAddress:ok' && err === undefined) {
        this.address = res;
      }
    }
  }
};
</script>

<style lang="scss">
.container {
  padding: 8px;
}
.text {
  font-size: 12px;
  color: #666;
  margin-top: 5px;
}

.uni-px-5 {
  padding-left: 10px;
  padding-right: 10px;
}

.uni-pb-5 {
  padding-bottom: 10px;
}
.info-image {
  display: flex;
  justify-content: center;
  image {
    width: 350rpx;
    height: 350rpx;
    border-radius: 20rpx;
    margin-bottom: 8px;
  }
}
.uni-section-content {
  padding: 8px 8px;
}
.info-item {
  display: flex;
  align-items: center;
  padding: 4px 0;
  color: #333;
  .info-item-title {
    width: 60px;
  }
  input {
    flex: 1;
    border: 1px solid #cfcfcf;
    padding: 4px;
    margin-left: 8px;
    border-radius: 4px;
    &.disabled {
      color: #999;
    }
  }
}
.address-button-box {
  display: flex;
  justify-content: center;
  padding-bottom: 15px;
}
</style>
