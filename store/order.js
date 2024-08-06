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
    saveToStorage(state) {
      uni.setStorageSync('orders', JSON.stringify(state.orders))
    }
  },
  getters: {}
}