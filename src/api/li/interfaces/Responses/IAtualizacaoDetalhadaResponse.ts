import { IHistoricoSituacaoObject, IPedidoDetalheResponse } from ".";

export interface IAtualizacaoDetalhadaResponse {
  situacao: string
  situacao_anterior: string
  pedido: IPedidoDetalheResponse
  atualizacao: IHistoricoSituacaoObject
}