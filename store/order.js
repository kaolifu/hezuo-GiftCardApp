export default {
  namespaced: true,
  state: () => ({
    orders: JSON.parse(uni.getStorageSync('orders') || '[]')
  }),
  mutations: {
    addToOrders(state, order) {
      state.orders.push(order)
      this.commit('m_order/saveToStorage')
    },
    removeOrderById(state, orderId) {
      state.orders = state.orders.filter(x => x.orderId !== orderId)
      this.commit('m_order/saveToStorage')
    },
    updateOrderCount(state, order) {
      const findResult = state.orders.find(x => x.orderId === order.orderId)
      if (findResult) {
        findResult.orderCount = order.orderCount
        this.commit('m_order/saveToStorage')
      }
    },
    saveToStorage(state) {
      uni.setStorageSync('orders', JSON.stringify(state.orders))
    }
  },
  getters: {
    total(state) {
      return state.orders.length
    }
  }
}