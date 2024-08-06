<template>
  <view class="container">
    <!-- 日历 -->
    <block v-for="(month, i) in months" :key="i">
      <view class="calendar">
        <!-- 日历标题 -->
        <view class="calendar-title">{{ month }}</view>
        <!-- 日历icon -->
        <view class="calendar-container">
          <block v-for="(item2, i) in items" :key="i">
            <view class="calendar-icon" v-show="item2.date === month" @tap="addCart(item2)">
              <image :src="item2.icon" mode="widthFix"></image>
              <view class="name">{{ item2.name }}</view>
              <view class="price">￥{{ item2.price }}</view>
              <view class="count" v-show="getCount(item2.id) > 0">{{ getCount(item2.id) }}</view>
            </view>
          </block>
        </view>
      </view>
    </block>
  </view>
  <uni-popup ref="popup" type="bottom" background-color="#fff">
    <view v-if="cart.length === 0" class="empty-cart">购物车里空空如也</view>
    <view v-else v-for="(item3, i) in cart" :key="i">
      <hz-cart-item-row :goods="item3" />
    </view>
  </uni-popup>
  <uni-goods-nav :options="options" :buttonGroup="buttonGroup" @click="openCart" @buttonClick="createOrder" class="goods_nav_bar" />
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
export default {
  computed: {
    ...mapState('m_cart', ['cart']),
    ...mapGetters('m_cart', ['goodsAmount'])
  },
  data() {
    return {
      items: [
        { id: '01', name: '瑞雪', price: 100, icon: '../../static/farm_icons/icon01.png', date: '2024年 08月' },
        { id: '02', name: '杨梅', price: 100, icon: '../../static/farm_icons/icon02.png', date: '2024年 08月' },
        { id: '03', name: '枸杞', price: 100, icon: '../../static/farm_icons/icon03.png', date: '2024年 08月' },
        { id: '04', name: '青苹果', price: 100, icon: '../../static/farm_icons/icon04.png', date: '2024年 08月' },
        { id: '05', name: '玉菇', price: 100, icon: '../../static/farm_icons/icon05.png', date: '2024年 08月' },
        { id: '06', name: '樱桃', price: 100, icon: '../../static/farm_icons/icon06.png', date: '2024年 09月' },
        { id: '07', name: '大米', price: 100, icon: '../../static/farm_icons/icon07.png', date: '2024年 09月' },
        { id: '08', name: '青芒', price: 100, icon: '../../static/farm_icons/icon08.png', date: '2024年 10月' },
        { id: '09', name: '水蜜桃', price: 100, icon: '../../static/farm_icons/icon09.png', date: '2024年 10月' },
        { id: '10', name: '大丽花', price: 100, icon: '../../static/farm_icons/icon10.png', date: '2024年 10月' },
        { id: '11', name: '红富士', price: 100, icon: '../../static/farm_icons/icon11.png', date: '2024年 11月' },
        { id: '12', name: '攀研芒果', price: 100, icon: '../../static/farm_icons/icon12.png', date: '2024年 11月' },
        { id: '13', name: '蓝莓', price: 100, icon: '../../static/farm_icons/icon13.png', date: '2024年 11月' },
        { id: '14', name: '青芒', price: 140, icon: '../../static/farm_icons/icon14.png', date: '2024年 11月' },
        { id: '15', name: '樱桃', price: 100, icon: '../../static/farm_icons/icon15.png', date: '2024年 12月' },
        { id: '16', name: '水果玉米', price: 140, icon: '../../static/farm_icons/icon16.png', date: '2024年 12月' }
      ],
      months: [],
      options: [{ icon: 'cart', text: '购物车', info: 2 }],
      buttonGroup: [{ text: '生成订单', backgroundColor: 'darkseagreen', color: '#fff' }]
    };
  },
  methods: {
    getMonths() {
      this.months = [...new Set(this.items.map((item) => item.date))];
    },
    getCount(itemId) {
      const cartItem = this.cart.find((cartItem) => cartItem.goods_id === itemId);
      return cartItem ? cartItem.goods_count : 0;
    },
    ...mapMutations('m_cart', ['addToCart', 'clearCart']),
    ...mapMutations('m_order', ['addToOrders']),
    addCart(item) {
      const goods = {
        goods_id: item.id,
        goods_name: item.name,
        goods_price: item.price,
        goods_count: 1,
        goods_date: item.date
      };
      this.addToCart(goods);
    },
    openCart() {
      this.$refs.popup.open('bottom');
    },
    createOrder() {
      const order = {
        orderId: Date.now(),
        createAt: new Date(),
        content: this.cart,
        amount: this.goodsAmount
      };
      this.addToOrders(order);
      this.clearCart();
      this.$refs.popup.close();
      uni.switchTab({
        url: '/pages/order/order'
      });
    }
  },
  onLoad() {
    this.getMonths();
  }
};
</script>

<style lang="scss">
.container {
  padding: 20rpx;
  padding-bottom: 50px;
  .calendar {
    background-color: #fff;
    border-radius: 12px;
    overflow: hidden;
    margin-top: 10px;
  }
  .calendar-title {
    width: 100%;
    background: darkseagreen;
    color: #fff;
    padding: 4px 0 4px 16px;
    font-size: 14px;
    box-sizing: border-box;
  }
  .calendar-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 20rpx;
    row-gap: 20rpx;
    padding: 20rpx;
    .calendar-icon {
      background-color: #fff;
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 0 10px #ccc;
      image {
        width: 100%;
      }
      .name {
        text-align: center;
        background-color: darkseagreen;
        font-size: 14px;
        color: #fff;
        padding: 4px 0;
      }
      .price {
        position: absolute;
        top: 5%;
        right: 5%;
        font-size: 14px;
        color: #fff;
        text-shadow: 0 0 10px #000;
        transform: rotate(15deg);
      }
      .count {
        background-color: seagreen;
        color: #fff;
        width: 18px;
        height: 18px;
        font-size: 12px;
        text-align: center;
        line-height: 18px;
        border-radius: 50%;
        position: absolute;
        top: 4px;
        left: 4px;
      }
    }
  }
}
.goods_nav_bar {
  position: fixed;
  bottom: 0%;
  width: 100%;
  z-index: 999;
}
.uni-popup__wrapper {
  padding-bottom: 50px;
  max-height: 400px;
  overflow-y: scroll;
}
.empty-cart {
  font-size: 14px;
  padding: 8px 16px;
}
</style>
