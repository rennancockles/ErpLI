import { ISituacao, IMeta } from "../Types";

export interface IPedidoResponseObject {
  cliente: string
  data_criacao: string
  data_expiracao: string
  data_modificacao: string
  id_anymarket: number
  id_externo: number
  numero: number
  peso_real: string
  resource_uri: string
  situacao: ISituacao
  utm_campaign: string
  valor_desconto: string
  valor_envio: string
  valor_subtotal: string
  valor_total: string
}

export interface IPedidoResponse {
  meta: IMeta
  objects: IPedidoResponseObject[]
}