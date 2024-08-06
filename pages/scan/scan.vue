<template>
  <view class="container" :style="{ height: wh + 'px' }">
    <image src="../../static/backgroundImage_day.png" mode="widthFix"></image>
    <view>
      <camera mode="scanCode" device-position="back" flash="off" @error="error"></camera>
      <view class="title" @click="gotoCardlink">
        <view>绑定卡片</view>
        <view>一起开始云种地生活吧！</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      wh: 0
    };
  },
  onLoad() {
    const sysInfo = uni.getSystemInfoSync();
    this.wh = sysInfo.windowHeight;
  },
  methods: {
    error(e) {
      console.log(e.detail);
    },
    gotoCardlink(){
      uni.navigateTo({
        url:'/subpkg/cardlink/cardlink'
      })
    }
  }
};
</script>

<style lang="scss">
.container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  camera {
    width: 600rpx;
    height: 600rpx;
    border-radius: 50%;
    border: 8px solid #fff;
  }
  .title {
    position: relative;
    color: #fff;
    text-align: center;
    font-size: 36rpx;
    margin-top: 80rpx;
  }
  image {
    position: absolute;
    width: 100%;
    top: 0;
  }
}
</style>
