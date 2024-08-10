<template>
  <view class="visiting-card">
    <view class="card-title">
      感谢您对禾作计划的支持！
      <br />
      我们的工作人员会联系您下单，请耐心等候。
      <br />
      您也可以添加客户经理的微信。
    </view>
    <view class="card-content">
      <view class="card-info">
        <view>卢迪</view>
        <view>大客户经理</view>
        <view>13524129017</view>
      </view>
      <view class="card-qr">
        <image src="../../static/visitingCard/personal-qrcode.jpg" mode="widthFix"></image>
        <view>
          欢迎关注
          <br />
          客户经理微信
        </view>
      </view>
      <view class="card-qr">
        <image src="../../static/visitingCard/personal-qrcode.jpg" mode="widthFix"></image>
        <view>
          欢迎关注
          <br />
          禾作计划小程序
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'hz-visiting-card',
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.visiting-card {
  box-sizing: border-box;
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 4px 8px;
  margin: 0 8px 8px 8px;
  font-size: 14px;
  .card-title {
    color: darkseagreen;
    text-align: center;
    margin-bottom: 8px;
  }
  .card-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  image {
    width: 200rpx;
  }
  .card-qr {
    font-size: 12px;
    text-align: center;
  }
}
</style>
