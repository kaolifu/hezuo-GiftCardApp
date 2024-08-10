<template>
  <uni-popup ref="popup" type="bottom" background-color="#fff" :safeArea="false">
    <view class="popup-content">
      <view v-if="cart.length === 0" class="empty-cart">购物车里空空如也</view>
      <view v-else v-for="(item, i) in cart" :key="i">
        <hz-cart-item-row :goods="item" />
      </view>
    </view>
  </uni-popup>
  <uni-goods-nav :options="options" :buttonGroup="buttonGroup" @click="openCart" @buttonClick="createOrder" class="goods_nav_bar" />
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
export default {
  name: 'hz-settle',
  computed: {
    ...mapState('m_cart', ['cart']),
    ...mapGetters('m_cart', ['goodsAmount', 'total'])
  },
  watch: {
    total: {
      handler(newVal) {
        const findResult = this.options.find((x) => x.text === '购物车');
        if (findResult) {
          findResult.info = newVal;
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      options: [{ icon: 'cart', text: '购物车', info: this.total }],
      buttonGroup: [{ text: '生成礼包', backgroundColor: 'darkseagreen', color: '#fff' }]
    };
  },
  methods: {
    openCart() {
      this.$refs.popup.open('bottom');
    },
    ...mapMutations('m_cart', ['clearCart']),
    ...mapMutations('m_order', ['addToOrders']),

    createOrder() {
      if (this.cart.length === 0) {
        uni.showToast({
          title: '您还没有添加购物车',
          icon: 'none'
        });
        return;
      }
      const order = {
        orderId: Date.now(),
        createAt: new Date(),
        content: this.cart,
        cartAmount: this.goodsAmount,
        orderCount: 1
      };
      this.addToOrders(order);
      this.clearCart();
      uni.switchTab({
        url: '/pages/order/order'
      });
      uni.$http.post('/order/add', order );
    }
  }
};
</script>

<style lang="scss">
.goods_nav_bar {
  position: fixed;
  bottom: 0%;
  width: 100%;
  z-index: 999;
}
.popup-content {
  padding-bottom: 50px;
  max-height: 400px;
  overflow-y: scroll;
  box-sizing: border-box;
}
.empty-cart {
  font-size: 14px;
  padding: 8px 16px;
}
</style>
