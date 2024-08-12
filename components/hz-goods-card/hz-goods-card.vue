<template>
  <view class="goods-card" @tap="gotoDetail(goods.id)">
    <image :src="'https://hzimg.hzmate.cn/' + goods.icon" mode="widthFix"></image>
    <view class="goods-info">
      <view class="info-title">
        <view class="title-name">{{ goods.title }}</view>
        <view class="title-price">{{ (goods.sellPrice / 100).toFixed(2) }} 元</view>
      </view>
      <view class="info-desc">
        <view>{{ goods.producer }}</view>
        <view>{{ goods.note }}</view>
        <view>{{ goods.netVol }}</view>
      </view>
      <view class="btns">
        <uni-icons type="minus-filled" size="24" color="darkseagreen" v-show="count > 0" @tap.stop="decreaseCount(goods)"></uni-icons>
        <input type="number" :value="count" v-show="count > 0" @tap.stop />
        <uni-icons type="plus-filled" size="24" color="darkseagreen" @tap.stop="addCart(goods)"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';

export default {
  name: 'hz-goods-card',
  props: {
    goods: {
      type: Object,
      default() {}
    }
  },
  computed: {
    ...mapState('m_cart', ['cart']),
    ...mapGetters('m_cart', ['goodsAmount']),
    count() {
      return this.getCount(this.goods);
    }
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations('m_cart', ['addToCart', 'updateGoodsCount', 'removeGoodsById']),
    addCart(item) {
      const goods = {
        goods_id: item.id,
        goods_name: item.title,
        goods_price: (item.sellPrice / 100).toFixed(2),
        goods_count: 1,
        goods_date: item.date
      };
      this.addToCart(goods);
    },
    decreaseCount(goods) {
      const findResult = this.cart.find((x) => x.goods_id === goods.id);
      if (findResult.goods_count > 0) {
        findResult.goods_count -= 1;
        if (findResult.goods_count === 0) {
          this.removeGoodsById(goods.id);
        }
        this.updateGoodsCount(findResult);
      }
    },
    getCount(goods) {
      const findResult = this.cart.find((x) => x.goods_id === goods.id);
      if (!findResult) return null;
      return findResult.goods_count;
    },
    gotoDetail(id) {
      uni.navigateTo({
        url: `/subpkg/goods-detail/goods-detail?id=${id}`
      });
    }
  }
};
</script>

<style lang="scss">
view {
  box-sizing: border-box;
}
.goods-card {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  padding: 8px 12px 4px 4px;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;
  border-bottom: 1px solid #ddd;
  image {
    min-width: 80px;
    width: 80px;
  }
  .goods-info {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 4px;
    .info-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      .title-name {
        width: 100px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .title-price {
        width: 72px;
        text-align: right;
      }
    }
    .info-desc {
      font-size: 12px;
      color: #999;
    }
    .btns {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      align-items: center;
      gap: 4px;
      input {
        border: 1px solid darkseagreen;
        font-size: 12px;
        width: 24px;
        text-align: right;
        border-radius: 4px;
        padding: 0 4px;
        box-sizing: border-box;
      }
    }
  }
}
</style>
