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
import badgeMix from '@/mixins/tabbar-badge.js';

export default {
  mixins: [badgeMix],

  data() {
    return {
      wh: 0,
      active: '2024-08',
      items: [],
      months: []
    };
  },
  methods: {
    async getFarm() {
      const { data: res } = await uni.$http.get('/farm');
      this.items = res.data;

      this.items = this.items.map((item) => ({
        ...item,
        note: item.note ? item.note.replace(/\\n/g, '：') : ''
      }));

      this.getMonths();

      this.active = this.months[0];
    },
    getMonths() {
      this.months = [...new Set(this.items.map((item) => item.date))];
      // 按时间顺序排序
      this.months.sort((a, b) => {
        // 将 YYYY-MM 字符串转换为 Date 对象
        const dateA = new Date(`${a}-01`);
        const dateB = new Date(`${b}-01`);

        // 比较两个 Date 对象
        return dateA - dateB;
      });
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
