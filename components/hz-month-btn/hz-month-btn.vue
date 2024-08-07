<template>
  <view :class="['left-scroll-view-item', active === month ? 'active' : '']">
    <view>{{ month }}</view>
    <view v-show="month === '2024-08'" class="subtitle">炎炎夏日 桃桃降暑</view>
    <image v-show="month === '2024-08' && active === month" src="../../static/month_icons/08.png" mode="widthFix" class="month-icon"></image>
    <view v-show="month === '2024-09'" class="subtitle">甜度12级车厘子</view>
    <image v-show="month === '2024-09' && active === month" src="../../static/month_icons/09.png" mode="widthFix" class="month-icon right"></image>
    <view v-show="month === '2024-10'" class="subtitle">金秋十月 鲜果丰收</view>
    <image v-show="month === '2024-10' && active === month" src="../../static/month_icons/10.png" mode="widthFix" class="month-icon"></image>
    <view v-show="month === '2024-11'" class="subtitle">白草莓上新</view>
    <image v-show="month === '2024-11' && active === month" src="../../static/month_icons/11.png" mode="widthFix" class="month-icon right"></image>
    <view v-show="month === '2024-12'" class="subtitle">云南小豆咖啡</view>
    <image v-show="month === '2024-12' && active === month" src="../../static/month_icons/12.png" mode="widthFix" class="month-icon"></image>
  </view>
</template>

<script>
export default {
  name: 'hz-month-btn',
  props: {
    month: {
      type: String,
      default() {}
    },
    active: {
      type: String,
      default() {}
    }
  },
  data() {
    return {};
  },
  methods: {
    activeChange(month) {
      this.active = month;
    }
  }
};
</script>

<style lang="scss">
.left-scroll-view-item {
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: darkseagreen;
  position: relative;
  .subtitle {
    font-size: 10px;
  }
  .month-icon {
    position: absolute;
    width: 24px;
    height: 24px;
    top: 10%;
    left: 5%;
    animation: scale 1s infinite linear;
    &.right {
      left: auto;
      right: 5%;
    }
  }
  &.active {
    color: #fff;
    background-color: darkseagreen;
  }
}
@keyframes scale {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
