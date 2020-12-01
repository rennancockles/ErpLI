<template>
  <v-navigation-drawer
  v-model="showDrawer"
  :bottom="$vuetify.breakpoint.xsOnly"
  :temporary="$vuetify.breakpoint.smAndDown"
  :permanent="$vuetify.breakpoint.mdAndUp"
  fixed
  clipped
  app
  >
    <v-list>
      <v-list-item-group color="primary">
        <v-list-item
        v-for="(item, i) in items"
        :key="i"
        router
        :to="item.to"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import Items from './MenuItems'

export default {
  name: 'Drawer',

  props: {
    show: {
      required: true,
      type: Boolean
    }
  },

  components: {
    //
  },

  data () {
    return {
      items: Items
    }
  },

  computed: {
    showDrawer: {
      get () {
        return this.show
      },
      set (val) {
        this.$emit('change', val)
      }
    }
  }
}
</script>
