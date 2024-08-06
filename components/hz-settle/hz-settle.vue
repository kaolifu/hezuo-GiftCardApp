<template>
  <view class="hz-settle-container">
    <uni-icons type="cart" size="24" color="#fff"></uni-icons>
    <view class="amount">合计金额: 1000 元</view>
    <view class="btn">生成订单</view>
  </view>
</template>

<script>
export default {
  name: 'hz-settle',
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.hz-settle-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 50px;
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: darkseagreen;
  color: #fff;
  .amount {
    font-size: 14px;
  }
  .btn {
    font-size: 14px;
  }
}
</style>
