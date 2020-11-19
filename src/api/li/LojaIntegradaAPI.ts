import axios from 'axios'
import { AxiosInstance } from "axios"
import { ILojaIntegradaAPI } from "./interfaces/ILojaIntegradaAPI"
import { IDefaultParams, IListarPedidosParams } from "./interfaces/Params"
import { IHistoricoSituacaoResponse, IPedidoDetalheResponse, IPedidoResponse } from "./interfaces/Responses"

export class LojaIntegradaAPI implements ILojaIntegradaAPI {
  private http: AxiosInstance
  
  constructor (api_key: string) {
    this.http = axios.create({
      baseURL: 'https://api.awsli.com.br/v1',
      headers: {
        'Content-Type': 'application/json',
        accept: '*/*'
      },
      params: {
        format: 'json',
        limit: 20,
        offset: 0,
        chave_api: api_key,
        chave_aplicacao: process.env.LI_APP_KEY
      }
    })
  }

  async listar_pedidos(params: IListarPedidosParams): Promise<IPedidoResponse> {
    const url = '/pedido/search'

    const { data } = await this.http.get(url, { params })
    return data
  }

  async detalhes_do_pedido(pedido_id: number): Promise<IPedidoDetalheResponse> {
    const url = `/pedido/${pedido_id}`

    const { data } = await this.http.get(url)
    return data
  }

  async historico_situacao(params: IDefaultParams): Promise<IHistoricoSituacaoResponse> {
    const url = '/situacao_historico'

    const { data } = await this.http.get(url, { params })
    return data
  }
}