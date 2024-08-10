<template>
  <view class="hz-settle-2btns-container">
    <uni-popup ref="popup" type="bottom" background-color="#fff" :safeArea="true">
      <view class="popup-content">
        <view v-if="cart.length === 0" class="empty-cart">购物车里空空如也</view>
        <view v-else v-for="(item, i) in cart" :key="i">
          <hz-cart-item-row :goods="item" />
        </view>
      </view>
    </uni-popup>
    <uni-goods-nav
      :options="options"
      :buttonGroup="buttonGroup"
      @click="openCart"
      @buttonClick="buttonClick"
      class="goods_nav_bar"
      :style="{ paddingBottom: safeAreaBottom + 'px' }"
    />
  </view>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
export default {
  name: 'hz-settle-2btns',
  options: {
    styleIsolation: 'shared'
  },
  props: {
    item: {
      type: Object,
      default() {}
    }
  },
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
      buttonGroup: [
        { text: '加入购物车', backgroundColor: 'yellowgreen', color: '#fff' },
        { text: '生成礼包', backgroundColor: 'darkseagreen', color: '#fff' }
      ],
      safeAreaBottom: 0
    };
  },
  methods: {
    openCart() {
      this.$refs.popup.open('bottom');
    },
    buttonClick(e) {
      if (e.content.text === '生成礼包') {
        this.createOrder();
      } else if (e.content.text === '加入购物车') {
        this.addCart(this.item);
      }
    },
    ...mapMutations('m_cart', ['clearCart', 'addToCart']),
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
    },
    addCart(item) {
      const goods = {
        goods_id: item.id,
        goods_name: item.name,
        goods_price: item.price.toFixed(2),
        goods_count: 1,
        goods_date: item.date
      };
      this.addToCart(goods);
    }
  },
  created() {
    this.safeAreaBottom = uni.getWindowInfo().safeAreaInsets.bottom;
  }
};
</script>

<style lang="scss">
.goods_nav_bar {
  position: fixed;
  bottom: 0%;
  width: 100%;
  z-index: 999;
  height: 50px;
  background-color: pink;
  .uni-goods-nav {
    height: inherit;
    padding-bottom: inherit;
    .uni-tab__cart-box {
      height: inherit;
      padding-bottom: inherit;
      //   .uni-tab__cart-sub-right {
      //     padding-bottom: inherit;
      //     height: inherit;
      //     .uni-tab__cart-button-right {
      //       padding-bottom: inherit;
      //       height: inherit;
      //     }
      //   }
    }
  }
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
