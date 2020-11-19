import { ISituacao, IMeta } from "../Types";

export interface IHistoricoSituacaoObject {
  alterado_por: string
  alterado_por_nome: string
  data: string
  id: number
  numero: number
  obs: string
  resource_uri: string
  situacao: ISituacao
  situacao_anterior: ISituacao
}

export interface IHistoricoSituacaoResponse {
  meta: IMeta
  objects: IHistoricoSituacaoObject[]
}