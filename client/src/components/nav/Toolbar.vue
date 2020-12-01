<template>
  <div id="toolbar">
    <!-- <Drawer :show="showDrawer" @change="onChangeShowDrawer"></Drawer> -->

    <v-app-bar color="primary" dark fixed clipped-left app>
      <!-- <v-app-bar-nav-icon @click.stop="showDrawer = !showDrawer" class="hidden-md-and-up"></v-app-bar-nav-icon> -->

      <v-toolbar-title>
        <router-link tag="a" class="home" to="/">
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <UserMenu></UserMenu>
    </v-app-bar>
  </div>
</template>

<script>
// import Drawer from './Drawer.vue'
import UserMenu from './menu/UserMenu.vue'

export default {
  name: 'Toolbar',
  data () {
    return {
      showDrawer: false
    }
  },
  components: {
    // Drawer,
    UserMenu
  },
  computed: {
    appTitle () {
      return `${process.env.VUE_APP_TITLE} ${process.env.VUE_APP_ENV_TITLE}`
    }
  },
  methods: {
    onChangeShowDrawer (val) {
      this.showDrawer = val
    }
  }
}
</script>

<style lang="scss">
#toolbar {
  a.home {
    color: #fff;
    text-decoration: none;
  }
}
</style>
