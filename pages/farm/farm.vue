<template>
  <view class="container">
    <scroll-view scroll-y="true" class="left-scroll-view" :style="{ height: wh + 'px' }">
      <view v-for="(item, i) in months" :key="i" @click="activeChange(item)">
        <hz-month-btn :month="item" :active="active"></hz-month-btn>
      </view>
    </scroll-view>

    <scroll-view scroll-y="true" class="right-scroll-view" :style="{ height: wh + 'px' }">
      <hz-month-banner :active="active"></hz-month-banner>
      <block v-for="(item2, i) in items" :key="i">
        <hz-goods-card :goods="item2" v-show="item2.date === active"></hz-goods-card>
      </block>
    </scroll-view>
  </view>
  
  <hz-settle></hz-settle>
</template>

<script>
import moment from 'moment';
moment.locale('zh-cn');

export default {
  data() {
    return {
      wh: 0,
      active: '2024-08',
      items: [],
      months: [],   
    };
  },
  methods: {
    async getFarm() {
      const { data: res } = await uni.$http.get('/farm');
      this.items = res.data;
      this.items.forEach((item) => {
        item.date = moment(item.date).format('YYYY-MM');
      });
      this.months = [...new Set(this.items.map((item) => item.date))];
      this.active = this.months[0];
    },
    activeChange(month) {
      this.active = month;
    }
  },
  onLoad() {
    this.getFarm();
    const sysInfo = uni.getSystemInfoSync();
    this.wh = sysInfo.windowHeight - 50;
  }
};
</script>

<style lang="scss">
.left-scroll-view {
  box-sizing: border-box;
  width: 180rpx;
  font-size: 14px;
  box-shadow: 0 0 10px #ccc;
}
.right-scroll-view {
  width: 570rpx;
  display: flex;
}
.container {
  display: flex;
}

</style>
