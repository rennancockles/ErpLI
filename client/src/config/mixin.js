import Vue from 'vue'

import { mapActions } from 'vuex'

Vue.mixin({
  methods: {
    ...mapActions([
      'setLoading',
      'setBreadcrumbs'
    ]),
    $goHome () {
      this.$router.push('/')
    },
    $goBack () {
      this.$router.go(-1)
    }
  }
})
