<template>
  <v-expansion-panel>
    <v-expansion-panel-header :color="status_color" class="white--text">
      {{item.numero}} - {{item.cliente_nome}}
      <v-spacer></v-spacer>
      {{ item.data_criacao | toBRDate }}
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <v-row>
        <v-col cols="12">
          <div>
            <span class="subtitle-1">
              <strong>Dados</strong>
            </span>

            <div class="body-2 mx-2">
              Pagamento: <span class="caption">{{ item.forma_pagamento }}</span>
            </div>
            <div class="body-2 mx-2">
              Código Transação: <span class="caption">{{ item.codigo_transacao }}</span>
            </div>
            <div class="body-2 mx-2">
              Envio: <span class="caption">{{ item.forma_envio }} - {{ item.prazo_envio }} dias</span>
            </div>
            <div class="body-2 mx-2">
              Endereço: <span class="caption">{{ item.cidade }} - {{ item.estado }}</span>
            </div>
            <div v-if="item.campanha" class="body-2 mx-2">
              Campanha: <span class="caption">{{ item.campanha }}</span>
            </div>
          </div>
        </v-col>

        <v-col cols="12">
          <div>
            <span class="subtitle-1">
              <strong>Itens</strong>
            </span>

            <div
            class="body-2 mx-2"
            v-for="(pedidoItem, i) in item.itens"
            :key="i"
            >
              {{pedidoItem.quantidade}} - {{pedidoItem.nome}} <br>
              <span class="caption ml-5">{{pedidoItem.sku}}</span>
            </div>
          </div>
        </v-col>

        <v-col cols="12">
          <div>
            <span class="subtitle-1">
              <strong>Valores</strong>
            </span>

            <div class="body-2 mx-2">
              Itens: <span class="caption">{{ item.valor_subtotal | money }}</span>
            </div>
            <div class="body-2 mx-2">
              Envio: <span class="caption">{{ item.valor_envio | money }}</span>
            </div>
            <div class="body-2 mx-2">
              Subtotal: <span class="caption">{{ (parseFloat(item.valor_subtotal) + parseFloat(item.valor_envio)) | money }}</span>
            </div>
            <div class="body-2 mx-2">
              Desconto: <span class="caption">{{ item.valor_desconto | money }}</span>
            </div>
            <div class="body-2 mx-2">
              Total: <span class="caption">{{ item.valor_total | money }}</span>
            </div>
          </div>
        </v-col>
      </v-row>

    </v-expansion-panel-content>

  </v-expansion-panel>
</template>

<script>

export default {
  name: 'LISaleItem',
  props: ['item'],
  data () {
    return {
      status_color: 'primary'
    }
  },

  created () {
    this.status_color = this.item.situacao_codigo === 'pedido_pago' ? 'secondary' : 'primary'
  }
}
</script>

<style lang="scss">
.v-expansion-panel-header__icon > i {
  color: #fff !important;
}
</style>
