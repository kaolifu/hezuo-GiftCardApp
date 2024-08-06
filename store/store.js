import {
  createStore
} from 'vuex'
import moduleUser from '@/store/user.js'
import moduleCart from '@/store/cart.js'
import moduleOrder from '@/store/order.js'

const store = createStore({
  // 需要挂在的模块
  modules: {
    'm_user': moduleUser,
    'm_cart': moduleCart,
    'm_order': moduleOrder
  }
})

export default store