<template>
  <view class="month-banner">
    <image v-show="season === 's02'" :src="banners[0]" mode="widthFix"></image>
    <image v-show="season === 's03'" :src="banners[1]" mode="widthFix"></image>
    <image v-show="season === 's04'" :src="banners[2]" mode="widthFix"></image>
  </view>
</template>

<script>
export default {
  name: 'hz-month-banner',
  props: {
    active: {
      type: String,
      default() {}
    }
  },
  data() {
    return {
      banners: []
    };
  },
  computed: {
    lastTwoC() {
      return this.active.slice(-2);
    },
    season() {
      const month = this.lastTwoC;
      if (['03', '04', '05'].includes(month)) {
        return 's01';
      } else if (['06', '07', '08'].includes(month)) {
        return 's02';
      } else if (['09', '10', '11'].includes(month)) {
        return 's03';
      } else if (['12', '01', '02'].includes(month)) {
        return 's04';
      } else {
        return 'unknown';
      }
    }
  },
  methods: {
    async getBanners() {
      const { data: res } = await uni.$http.get('/farm/get-banner');
      this.banners = [...new Set(res.data.map((item) => item.banner))];
    }
  },
  created() {
    this.getBanners();
  }
};
</script>

<style lang="scss">
.month-banner {
  width: 540rpx;
  height: 120px;
  box-sizing: border-box;
  border: 2px solid #fff;
  border-radius: 8px;
  overflow: hidden;
  margin: 0 auto 12px;
  image {
    width: 100%;
    height: 120px;
  }
}
</style>
