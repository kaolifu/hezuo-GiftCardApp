<template>
  <view class="detail-pic">
    <image :src="goods_detail" mode="widthFix"></image>
  </view>
  <hz-settle></hz-settle>
</template>

<script>
export default {
  data() {
    return {
      goods_detail: null
    };
  },
  methods: {
    async getGoodsDetail(goods_id) {
      const { data: res } = await uni.$http.get('/farm/get-farm-detail', { goods_id: goods_id });
      this.goods_detail = res.data[0].detail_pic;
    }
  },
  onLoad(options) {
    const goods_id = options.id;
    this.getGoodsDetail(goods_id);
  }
};
</script>

<style lang="scss">
  .detail-pic{
    width: 100%;
    image{
      width: 100%;
    }
  }
</style>
