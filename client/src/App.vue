<template>
  <v-app>
    <Toolbar v-if="isLoggedIn && !isAuthPage" />

    <v-main class="default">
      <v-container :class="fillHeight">
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <div>{{ version }}</div>
      <v-spacer></v-spacer>
      <div>R3Ck &copy; {{ currentYear }}</div>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Toolbar from '@/components/nav/Toolbar.vue'

export default {
  name: 'App',

  components: {
    Toolbar
  },

  data: () => ({
    //
  }),
  computed: {
    ...mapGetters(['isLoggedIn', 'loading']),
    currentYear () {
      return new Date().getFullYear()
    },
    version () {
      return process.env.VUE_APP_VERSION
    },
    isAuthPage () {
      return (this.$route.name || '').includes('auth')
    },
    fillHeight () {
      return this.isAuthPage ? 'fill-height' : ''
    }
  },

  methods: {
    ...mapActions([
      'setUser',
      'setIsLoggedIn'
    ]),
    redirectLogin () {
      this.$router.push({ name: 'auth.login' })
    }
  },

  created () {
    this.setIsLoggedIn(this.$storage.isLoggedIn())

    if (this.isLoggedIn) {
      const user = this.$storage.getUser()

      this.setUser(user)
    } else {
      this.redirectLogin()
    }
  }
}
</script>
