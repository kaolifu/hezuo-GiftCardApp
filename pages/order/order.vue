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
    <!-- 客户经理名片 -->
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
    <view v-for="(order, i) in orders" :key="i" class="order">
      <!-- 订单标题 -->
      <view class="order-title">
        <view>
          <view>订单编号：{{ order.orderId }}</view>
          <view>创建时间：{{ getDate(order.createAt) }}</view>
        </view>
        <uni-icons type="closeempty" size="16" @tap="deleteOrder(order.orderId)"></uni-icons>
      </view>
      <!-- 订单内容 -->
      <view>
        <!-- 订单抬头 -->
        <view class="order-content-row">
          <view>内容</view>
          <view>份数</view>
          <view>单价</view>
          <view>小计</view>
        </view>
        <!-- 订单具体产品 -->
        <view v-for="(goods, i) in order.content" :key="i" class="order-content-row">
          <view>{{ goods.goods_name }}</view>
          <view>{{ goods.goods_count }}</view>
          <view>{{ goods.goods_price }}</view>
          <view>{{ getAmount(goods) }}</view>
        </view>
      </view>
      <!-- 订单总价 -->
      <view class="order-amount-row">
        <view class="amount-text">总价</view>
        <view class="amount-num">{{ order.amount }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import moment from 'moment';
export default {
  computed: {
    ...mapState('m_order', ['orders'])
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations('m_order', ['removeOrderById']),
    getAmount(goods) {
      return goods.goods_count * goods.goods_price;
    },
    getDate(date) {
      return moment(date).format('YYYY-MM-DD HH:MM:SS');
    },
    gotoFarm() {
      uni.switchTab({
        url: '/pages/farm/farm'
      });
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
.order {
  box-sizing: border-box;
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 4px 8px;
  margin: 0 8px 8px 8px;
  font-size: 14px;
  line-height: 22px;
  .order-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
  }
  .order-content-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    text-align: center;
  }
  .order-amount-row {
    display: grid;
    grid-template-columns: 1fr 3fr;
    border-top: 1px solid #ccc;
    .amount-text {
      text-align: center;
    }
    .amount-num {
      text-align: center;
    }
  }
}
</style>
