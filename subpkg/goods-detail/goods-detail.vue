<template>
  <view class="detail-pic" :style="{ paddingBottom: safeAreaBottom + 50 + 'px' }">
    <image :src="'https://hzimg.hzmate.cn/' + goods.detail_pic" mode="widthFix"></image>
  </view>
  <hz-settle-2btns :item="goods"></hz-settle-2btns>
</template>

<script>
export default {
  data() {
    return {
      goods: {},
      safeAreaBottom: 0
    };
  },
  methods: {
    async getGoodsDetail(goods_id) {
      const { data: res } = await uni.$http.get('/farm/get-farm', { goods_id: goods_id });
      this.goods = res.data[0];
    }
  },
  onLoad(options) {
    const goods_id = options.id;
    this.getGoodsDetail(goods_id);

    this.safeAreaBottom = uni.getWindowInfo().safeAreaInsets.bottom;
  }
};
</script>

<style lang="scss">
.detail-pic {
  width: 100%;
  image {
    width: 100%;
  }
}
</style>
