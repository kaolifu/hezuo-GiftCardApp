import {
  mapGetters
} from 'vuex';

export default {
  computed: {
    ...mapGetters('m_order', ['total'])
  },
  watch: {
    total() {
      this.setBadge()
    }
  },
  onShow() {
    this.setBadge();
  },
  methods: {
    setBadge() {
      if (this.total > 0) {
        uni.setTabBarBadge({
          index: 3,
          text: this.total + ''
        });
      }
    }
  }
}