import { IHistoricoSituacaoObject, IPedidoDetalheResponse } from ".";

export interface IAtualizacaoDetalhadaResponse {
  situacao: string
  situacao_anterior: string
  data: string
  pedido: IPedidoDetalheResponse
  atualizacao: IHistoricoSituacaoObject
}