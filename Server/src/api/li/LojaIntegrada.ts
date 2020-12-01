import { ILojaIntegrada } from "./interfaces/ILojaIntegrada"
import { ILojaIntegradaAPI } from "./interfaces/ILojaIntegradaAPI"
import { IDefaultParams, IListarPedidosParams } from "./interfaces/Params"
import { IAtualizacaoDetalhadaResponse, IHistoricoSituacaoObject, IPedidoDetalheResponse, IPedidoResponseObject } from "./interfaces/Responses"
import { IResumoResponse } from "./interfaces/Responses/IResumoResponse"
import { LojaIntegradaAPI } from "./LojaIntegradaAPI"

export class LojaIntegrada implements ILojaIntegrada {
  private api: ILojaIntegradaAPI

  constructor (api_key: string) {
    this.api = new LojaIntegradaAPI(api_key)
  }

  async pedidos_pagos(offset: number = 0): Promise<IPedidoResponseObject[]> {
    const params: IListarPedidosParams = {
      offset,
      situacao_id: 4
    }

    const response = await this.api.listar_pedidos(params)

    const pedidos = response.objects

    if (pedidos.length === response.objects.length && response.meta.next) {
      const proximosPedidos = await this.pedidos_pagos(offset + 20)
      pedidos.push(...proximosPedidos)
    }

    return pedidos
  }

  async pedidos_pagos_detalhados(): Promise<IPedidoDetalheResponse[]> {
    const detalhes: IPedidoDetalheResponse[] = []
    const pedidos = await this.pedidos_pagos()

    for (let index = 0; index < pedidos.length; index++) {
      const pedido = pedidos[index]
      const pedidoDetalhado = await this.api.detalhes_do_pedido(pedido.numero)
      detalhes.push(pedidoDetalhado)
    }

    return detalhes
  }

  async pedidos_criados(date: string, offset: number = 0): Promise<IPedidoResponseObject[]> {
    const params: IListarPedidosParams = {
      offset,
      since_criado: date,
    }

    const response = await this.api.listar_pedidos(params)

    const desiredDate = new Date(date)

    const pedidos = response.objects.filter(obj => {
      const objDate = new Date(obj.data_criacao.split('T')[0])
      return objDate.toString() === desiredDate.toString()
    })

    if (pedidos.length === response.objects.length && response.meta.next) {
      const proximosPedidos = await this.pedidos_criados(date, offset + 20)
      pedidos.push(...proximosPedidos)
    }

    return pedidos
  }

  async pedidos_criados_detalhados(date: string): Promise<IPedidoDetalheResponse[]> {
    const detalhes: IPedidoDetalheResponse[] = []
    const pedidos = await this.pedidos_criados(date)

    for (let index = 0; index < pedidos.length; index++) {
      const pedido = pedidos[index]
      const pedidoDetalhado = await this.api.detalhes_do_pedido(pedido.numero)
      detalhes.push(pedidoDetalhado)
    }

    return detalhes
  }

  async atualizacoes(date: string, offset: number = 0): Promise<IHistoricoSituacaoObject[]> {
    const params: IDefaultParams = { offset }

    const response = await this.api.historico_situacao(params)

    const desiredDate = new Date(date)
    const lastObjectDate = new Date(response.objects[response.objects.length - 1].data.split('T')[0])

    const atualizacoes = response.objects.filter(obj => {
      const objDate = new Date(obj.data.split('T')[0])
      return objDate.toString() === desiredDate.toString()
    })

    if (response.meta.total_count !== response.objects.length && response.meta.next && lastObjectDate <= desiredDate) {
      const proximasAtualizacoes = await this.atualizacoes(date, offset + 20)
      atualizacoes.push(...proximasAtualizacoes)
    }

    return atualizacoes
  }

  async atualizacoes_detalhadas(date: string): Promise<IAtualizacaoDetalhadaResponse[]> {
    const detalhes = []
    const atualizacoes = await this.atualizacoes(date)

    for (let index = 0; index < atualizacoes.length; index++) {
      const atualizacao = atualizacoes[index]
      const pedidoDetalhado = await this.api.detalhes_do_pedido(atualizacao.numero)

      detalhes.push({
        data: date,
        situacao: atualizacao.situacao.codigo,
        situacao_anterior: atualizacao.situacao_anterior.codigo,
        pedido: pedidoDetalhado,
        atualizacao
      })
    }

    return detalhes
  }

  async resumo_atualizacoes(date: string): Promise<IResumoResponse[]> {
    const atualizacoes = await this.atualizacoes_detalhadas(date)
    const resumoResponseArray: IResumoResponse[] = []

    for (let index = 0; index < atualizacoes.length; index++) {
      const atualizacao = atualizacoes[index];
      let resumoResponse = resumoResponseArray.find(res => res.situacao === atualizacao.situacao)
      
      if (!resumoResponse) {
        resumoResponse = {
          situacao: atualizacao.situacao,
          quantidade: 0,
          valor_total: 0,
          pedidos: []
        }
        resumoResponseArray.push(resumoResponse)
      } 
      
      resumoResponse.quantidade += 1
      resumoResponse.valor_total += parseFloat(atualizacao.pedido.valor_total)
      resumoResponse.pedidos.push(atualizacao.pedido)
    }

    return resumoResponseArray
  }

  detalhe_pedido(id: number): Promise<IPedidoDetalheResponse> {
    return this.api.detalhes_do_pedido(id)
  }
}