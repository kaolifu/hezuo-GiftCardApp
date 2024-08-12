<template>
  <view>
    <!-- 顶部标签选择区域 -->
    <view class="tabBar">
      <view :class="['tabBarItem', { active: active === 0 }]" @click="tabItemHandler(0)">我发出的卡片</view>
      <view :class="['tabBarItem', { active: active === 1 }]" @click="tabItemHandler(1)">我兑换的卡片</view>
    </view>
    <!-- 发出的卡片信息区域 -->
    <view v-if="active === 0">
      <uni-collapse>
        <block v-for="(item, i) in presentCardsData" :key="i">
          <!-- 卡片item -->
          <uni-collapse-item title-border="none" :border="false" class="card-item">
            <!-- 卡片表面 -->
            <template v-slot:title>
              <uni-list>
                <image :src="item.image"></image>
                <view class="card-info">
                  <view class="card-title">
                    <view>{{ item.name }}</view>
                    <uni-tag
                      :text="item.isConverted ? '卡片已兑换' : '卡片未兑换'"
                      size="small"
                      :inverted="item.isConverted"
                      circle="true"
                      :type="item.isConverted ? 'default' : 'success'"
                    ></uni-tag>
                  </view>
                  <view class="card-info-text">ID：{{ item.id }}</view>
                  <view class="card-info-text">内容：{{ item.content }}</view>
                </view>
              </uni-list>
            </template>
            <!-- 卡片详情 -->
            <view class="card-detail">
              <view :class="[item.isConverted ? 'converted' : 'unconverted']">{{ item.isConverted ? '卡片已兑换' : '卡片未兑换' }}</view>
              <view v-show="item.isConverted">
                <view>兑换时间：{{ item.convertedUserDate }}</view>
                <view>兑换人联系方式：{{ maskData(item.convertedUserPhone) }}</view>
                <view>兑换人名称：{{ maskData(item.convertedUserName) }}</view>
                <view>兑换人地址：{{ maskData(item.convertedAddress) }}</view>
                <view>物流信息：{{ item.expressId }}</view>
              </view>
            </view>
          </uni-collapse-item>
        </block>
      </uni-collapse>
    </view>
    <!-- 兑换的卡片信息区域 -->
    <view v-if="active === 1">
      <uni-collapse>
        <block v-for="(item, i) in convertCardsData" :key="i">
          <!-- 卡片item -->
          <uni-collapse-item title-border="none" :border="false" class="card-item">
            <!-- 卡片表面 -->
            <template v-slot:title>
              <uni-list>
                <image :src="item.image"></image>
                <view class="card-info">
                  <view>
                    <view class="card-title">{{ item.name }}</view>
                  </view>
                  <view class="card-info-text">ID：{{ item.id }}</view>
                  <view class="card-info-text">内容：{{ item.content }}</view>
                </view>
              </uni-list>
            </template>
            <!-- 卡片详情 -->
            <view class="card-detail">
              <view :class="[item.isConverted ? 'converted' : 'unconverted']">{{ item.isConverted ? '卡片已兑换' : '卡片未兑换' }}</view>
              <view v-show="item.isConverted">
                <view>兑换时间：{{ item.convertedUserDate }}</view>
                <view>兑换人联系方式：{{ item.convertedUserPhone }}</view>
                <view>兑换人名称：{{ item.convertedUserName }}</view>
                <view>兑换人地址：{{ item.convertedAddress }}</view>
                <view>物流信息：{{ item.expressId }}</view>
              </view>
            </view>
          </uni-collapse-item>
        </block>
      </uni-collapse>
    </view>
  </view>
</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js';

export default {
  mixins: [badgeMix],

  data() {
    return {
      // 激活的顶部tabbar编号
      active: 0,
      // 全部卡片数据
      cardData: [
        {
          id: 'huvhi09u2nla9ucvo2',
          isConvertedByMe: false,
          name: '至尊大礼包',
          content: '瑞雪 * 3 / 草莓 * 2 / 咖啡 * 3 / 芒果 * 2 / 红米 * 3',
          isConverted: true,
          image: '../../static/cardPics/gift.png',
          convertedUserDate: '2024/7/1',
          convertedUserPhone: '13901019292',
          convertedUserName: '罗翔',
          convertedAddress: '上海市虹口区赤峰路22号105室',
          expressId: '192828492847'
        },
        {
          id: 'vosa99872n1bcoiw41',
          isConvertedByMe: false,
          name: '攀研芒果礼品卡',
          content: '攀研芒果 * 3',
          isConverted: false,
          image: '../../static/cardPics/mango.png',
          convertedUserDate: undefined,
          convertedUserPhone: undefined,
          convertedUserName: undefined,
          convertedAddress: undefined,
          expressId: undefined
        },
        {
          id: '89saaono1no8u723yu',
          isConvertedByMe: true,
          name: '云南小豆咖啡认养卡',
          content: '小豆咖啡 * 1',
          isConverted: true,
          image: '../../static/cardPics/coffee.png',
          convertedUserDate: '2024/7/22',
          convertedUserPhone: '13399448755',
          convertedUserName: '张三',
          convertedAddress: '上海市青浦区天空之城22号1008室',
          expressId: '19284792743'
        },
        {
          id: 'jfc89bono28dfbqnhc82',
          isConvertedByMe: true,
          name: '海南黄椰青礼品卡',
          content: '海南黄椰青 * 1',
          isConverted: true,
          image: '../../static/cardPics/coconuts.png',
          convertedUserDate: '2024/7/14',
          convertedUserPhone: '13399448755',
          convertedUserName: '张三',
          convertedAddress: '上海市青浦区天空之城22号1008室',
          expressId: '1438398672'
        }
      ],
      // 我发出的卡片的数据
      presentCardsData: [],
      // 我兑换的卡片的数据
      convertCardsData: []
    };
  },
  computed: {},
  methods: {
    tabItemHandler(n) {
      this.active = n;
    },
    maskData(str) {
      if (typeof str !== 'string') return;
      if (str.length < 7) {
        const firstPart = str.slice(0, 1);
        const maskedPart = '*'.repeat(str.length - 1);
        return `${firstPart}${maskedPart}`;
      }
      const firstPart = str.slice(0, 3);
      const lastPart = str.slice(-4);
      const maskedPart = '*'.repeat(str.length - 7);
      return `${firstPart}${maskedPart}${lastPart}`;
    }
  },
  onLoad() {
    // 从所有卡片数据里，找到我发出的卡片
    this.presentCardsData = this.cardData.filter((x) => x.isConvertedByMe === false);
    // 从所有卡片数据里，找到我兑换的卡片
    this.convertCardsData = this.cardData.filter((x) => x.isConvertedByMe === true);
  }
};
</script>

<style lang="scss">
.tabBar {
  display: flex;
  justify-content: space-between;
  .tabBarItem {
    text-align: center;
    flex: 1;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    background-color: #ddd;
    box-sizing: border-box;
    &.active {
      background: #1aad19;
      color: #fff;
    }
  }
}
.card-item {
  .uni-list {
    flex-direction: row;
    align-items: center;
    padding: 4px;
    image {
      width: 120rpx;
      height: 120rpx;
      padding: 10px;
      box-sizing: border-box;
    }
    .card-info {
      width: 580rpx;
      .card-title {
        font-size: 14px;
        margin-bottom: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .uni-tag {
          font-size: 10px;
          margin-right: 10px;
        }
      }
      .card-info-text {
        font-size: 12px;
        color: #666;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .card-detail {
    padding: 4px 10px;
    background-color: #f0f0f0;
    .converted {
      color: #c00000;
    }
    .unconverted {
      color: #999;
    }
  }
}
</style>
