<template>
  <view class="order">
    <!-- 订单标题 -->
    <view class="order-title">
      <view>
        <view>礼包编号：{{ order.orderId }}</view>
        <view>创建时间：{{ date }}</view>
      </view>
      <uni-icons type="closeempty" size="16" @tap="deleteOrder(order.orderId)"></uni-icons>
    </view>
    <!-- 订单内容 -->
    <view class="order-content">
      <!-- 订单抬头 -->
      <view class="order-content-row">
        <view>上市日期</view>
        <view>商品名</view>
        <view>份数</view>
        <view>单价</view>
        <view>小计</view>
      </view>
      <!-- 订单具体产品 -->
      <view v-for="(goods, i) in order.content" :key="i" class="order-content-row">
        <view>{{ goods.goods_date }}</view>
        <view>{{ goods.goods_name }}</view>
        <view>{{ goods.goods_count }}</view>
        <view>{{ goods.goods_price }}</view>
        <view>{{ getAmount(goods) }}</view>
      </view>
    </view>
    <!-- 订单总价 -->
    <view class="order-amount">
      <view class="order-amount-row">
        <view class="amount-text">礼包合计金额</view>
        <view class="amount-num">{{ order.cartAmount }}</view>
      </view>
      <view class="order-amount-row">
        <view class="amount-text">礼包份数</view>
        <view class="amount-count">
          <uni-icons type="left" size="16" @tap="decreaseCount(order)"></uni-icons>
          <text class="amount-count-num">{{ order.orderCount }}</text>
          <uni-icons type="right" size="16" @tap="increaseCount(order)"></uni-icons>
        </view>
      </view>
      <view class="submitBtn-row">
        <button type="primary" size="mini" class="submitBtn" style="margin-right: 0" v-show="isOrderChanged" @tap="updateOrder">提交订单</button>
      </view>
    </view>
    <view class="order-total-amount">
      <view class="order-total-amount-row">
        <view class="total-amount-text">订单总计金额</view>
        <view class="total-amount-num">{{ orderAmount.toFixed(2) }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import moment from 'moment';

export default {
  name: 'hz-order',
  props: {
    order: {
      type: Object,
      default() {}
    }
  },
  data() {
    return {
      isOrderChanged: false
    };
  },
  methods: {
    ...mapMutations('m_order', ['removeOrderById', 'updateOrderCount']),
    getAmount(goods) {
      return (goods.goods_count * goods.goods_price).toFixed(2);
    },
    deleteOrder(orderId) {
      uni.showModal({
        title: '删除订单',
        content: '您确定要删除订单吗？',
        success: (res) => {
          if (res.confirm) {
            this.removeOrderById(orderId);
          } else if (res.cancel) {
            return;
          }
        }
      });
    },
    increaseCount(order) {
      this.isOrderChanged = true;
      order.orderCount += 1;
      this.updateOrderCount(order);
    },
    decreaseCount(order) {
      if (order.orderCount > 1) {
        this.isOrderChanged = true;
        order.orderCount -= 1;
        this.updateOrderCount(order);
      }
    },
    updateOrder() {
      this.isOrderChanged = false;
      /**
       * 提交订单
       *
       *
       *
       */
    }
  },
  computed: {
    date() {
      return moment(this.order.createAt).format('YYYY-MM-DD HH:mm:ss');
    },
    orderAmount() {
      return this.order.cartAmount * this.order.orderCount;
    }
  }
};
</script>

<style lang="scss">
.order {
  box-sizing: border-box;
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 4px 8px;
  margin: 0 8px 8px 8px;
  font-size: 12px;
  line-height: 20px;
  .order-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    margin-bottom: 8px;
    padding-bottom: 8px;
  }
  .order-content{
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .order-content-row {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 1fr 1fr;
    text-align: center;
    align-items: center;
  }
  .order-amount {
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid #ccc;
    .order-amount-row {
      display: grid;
      grid-template-columns: 3fr 1fr;
      .amount-text {
        text-align: center;
      }
      .amount-num {
        text-align: center;
      }
      .amount-count {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 4;
        .amount-count-num {
          width: 20px;
          text-align: center;
        }
      }
    }
    .submitBtn-row {
      display: flex;
      justify-content: flex-end;
      .submitBtn {
        margin-top: 8px;
        margin-right: 4px;
        font-size: 12px;
      }
    }
  }
  .order-total-amount {
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid #ccc;
    .order-total-amount-row {
      display: grid;
      grid-template-columns: 3fr 1fr;
      .total-amount-text {
        text-align: center;
        font-weight: bold;
      }
      .total-amount-num {
        text-align: center;
        font-weight: bold;
      }
    }
  }
}
</style>