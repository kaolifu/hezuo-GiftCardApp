<template>
  <view class="empty-order" v-if="orders.length === 0">
    <view class="empty-order-content">没有订单信息</view>
    <view class="empty-order-content">
      请前往
      <button type="primary" size="mini" @tap="gotoFarm">禾作农场</button>
      下单
    </view>
  </view>
  <view v-else>
    <block v-for="(order, i) in orders" :key="i">
      <hz-order :order="order"></hz-order>
    </block>
    <view class="button">
      <button type="primary" @tap="gotoFarm" class="onemoreBtn">加购一份</button>
    </view>
    <hz-visiting-card></hz-visiting-card>
  </view>
</template>

<script>
import { mapState } from 'vuex';
import badgeMix from '@/mixins/tabbar-badge.js';
export default {
  mixins: [badgeMix],
  computed: {
    ...mapState('m_order', ['orders'])
  },
  data() {
    return {};
  }, 
  methods: {
    gotoFarm() {
      uni.switchTab({
        url: '/pages/farm/farm'
      });
    }
  }
};
</script>

<style lang="scss">
.empty-order {
  margin-top: 300px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 8px;
  .empty-order-content {
    display: flex;
    align-items: center;
    gap: 4px;
  }
}
.button {
  width: calc(100% - 16px);
  margin: 8px auto 8px;
  .onemoreBtn{
    font-size: 14px;
  }
}
</style>
