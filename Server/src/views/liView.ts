import { IPedidoDetalheResponse } from "../api/li/interfaces/Responses"
import { IItem } from "../api/li/interfaces/Types"

const itensView = {
  render (item: IItem) {
    return {
      nome: item.nome,
      quantidade: parseInt(item.quantidade),
      sku: item.sku,
    }
  },

  renderMany (items: IItem[]) {
    return items.map(item => this.render(item))
  }
}

export default {
  render (detalhe: IPedidoDetalheResponse) {
    return {
      numero: detalhe.numero,
      cliente_nome: detalhe.cliente.nome,
      data_criacao: detalhe.data_criacao,
      situacao_nome: detalhe.situacao.nome,
      situacao_codigo: detalhe.situacao.codigo,
      forma_pagamento: detalhe.pagamentos[0].forma_pagamento.nome || '',
      codigo_transacao: detalhe.pagamentos[0].transacao_id || '',
      forma_envio: detalhe.envios[0].forma_envio.nome || '',
      prazo_envio: detalhe.envios[0].prazo || '',
      cidade: detalhe.endereco_entrega.cidade,
      estado: detalhe.endereco_entrega.estado,
      campanha: detalhe.utm_campaign,
      valor_subtotal: detalhe.valor_subtotal,
      valor_envio: detalhe.valor_envio,
      valor_desconto: detalhe.valor_desconto,
      valor_total: detalhe.valor_total,
      itens: itensView.renderMany(detalhe.itens)
    }
  },

  renderMany (detalhes: IPedidoDetalheResponse[]) {
    return detalhes.map(detalhe => this.render(detalhe))
  }
}