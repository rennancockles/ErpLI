<template>
  <v-row>
    <v-col cols="12">
      <h2 v-if="liItems.length > 0">Pedidos Pagos - Loja Integrada</h2>
    </v-col>

    <v-col
    v-for="(liItem, i) in liItems"
    :key="i"
    cols="12" sm="8" offset-sm="2" md="6" offset-md="0" lg="4"
    >
      <v-expansion-panels>
        <LISaleItem :item="liItem"></LISaleItem>
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>

<script>
import API from '@/api/sales'
import LISaleItem from '@/components/LISaleItem.vue'

export default {
  name: 'Home',

  components: {
    LISaleItem
  },

  data () {
    return {
      liItems: []
    }
  },

  async created () {
    const response = await API.paid()
    this.liItems = response.data.li

    this.liItems.sort((a, b) => a.numero - b.numero)
    console.log(this.liItems)
  }
}
</script>
