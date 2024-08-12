<template>
  <view class="hz-login">
    <image src="../../static/logo-05.png" mode="widthFix"></image>
    <button type="primary" open-type="getPhoneNumber" @getphonenumber="onGetphonenumber">加入禾作计划</button>
    <view class="text">开启云种田生活</view>
  </view>
</template>

<script>
export default {
  name: 'hz-login',
  data() {
    return {
      code: null,
      encryptedData: null,
      iv: null
    };
  },
  methods: {
    getUserCode() {
      uni.login({
        provider: 'weixin',
        success: (res) => {
          this.code = res.code;
          console.log('code: ' + this.code);
        }
      });
    },
    async onGetphonenumber(ev) {
      this.encryptedData = ev.detail.code;
      this.iv = ev.detail.iv;

      await uni.$http.post('/user/login', { code: this.code, encryptedData: this.encryptedData, iv: this.iv });
    }
  },
  created() {
    this.getUserCode();
  }
};
</script>

<style lang="scss">
.hz-login {
  padding-top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  image {
    width: 300rpx;
  }
  button {
    width: 300rpx;
    margin-top: 40px;
    font-size: 16px;
  }
  .text {
    color: darkseagreen;
    margin-top: 12px;
  }
}
</style>