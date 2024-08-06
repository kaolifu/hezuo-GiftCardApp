<template>
  <view v-for="(item, i) in items" :key="i">
    <view>{{ item.name }}</view>
    <view class="count">{{ getCount(item.id) }}</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          id: '01',
          name: 'aaa'
        },
        {
          id: '02',
          name: 'bbb'
        },
        {
          id: '03',
          name: 'ccc'
        }
      ],
      cart: [
        {
          id: '01',
          name: 'aaa',
          count: 1
        },
        {
          id: '02',
          name: 'bbb',
          count: 3
        }
      ]
    };
  },
  methods: {
    getCount(itemId) {
      const cartItem = this.cart.find((cartItem) => cartItem.id === itemId);
      return cartItem ? cartItem.count : 0;
    }
  }
};
</script>

<style lang="scss"></style>
