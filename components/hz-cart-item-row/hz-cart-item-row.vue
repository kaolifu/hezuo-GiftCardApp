<template>
  <view class="item-row">
    <text class="name">{{ goods.goods_name }}</text>
    <view class="item-text">
      <view class="count">
        <uni-icons type="left" size="16" color="darkseagreen" @tap="decreaseCount(goods)" />
        <input type="number" :value="goods.goods_count" />
        <uni-icons type="right" size="16" color="darkseagreen" @tap="increaseCount(goods)" />
        <text>份</text>
      </view>
      <view>×</view>
      <view class="price">{{ goods.goods_price }}元/份</view>
      <view>=</view>
      <view class="amount">{{ amount }}元</view>
    </view>
    <uni-icons type="closeempty" size="16" @tap="removeGoodsById(goods.goods_id)"></uni-icons>
  </view>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
  name: 'hz-cart-item-row',
  props: {
    goods: {
      type: Object,
      default() {}
    }
  },
  data() {
    return {};
  },
  computed: {
    amount() {
      return (this.goods.goods_count * this.goods.goods_price).toFixed(2);
    }
  },
  methods: {
    ...mapMutations('m_cart', ['updateGoodsCount', 'removeGoodsById']),
    increaseCount(goods) {
      goods.goods_count += 1;
      this.updateGoodsCount(goods);
    },
    decreaseCount(goods) {
      if (goods.goods_count > 1) {
        goods.goods_count -= 1;
        this.updateGoodsCount(goods);
      }
    }
  }
};
</script>

<style lang="scss">
.item-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  font-size: 14px;
  .item-text {
    flex: 1;
    display: flex;
    gap: 4px;
    align-items: center;
    justify-content: start;
  }
  .name {
    width: 60px;
    text-align: center;
  }
  .count {
    display: flex;
    align-items: center;
  }
  input {
    border: 1px solid darkseagreen;
    display: inline-block;
    width: 24px;
    text-align: right;
    border-radius: 4px;
    padding: 0 4px;
  }
}
</style>
