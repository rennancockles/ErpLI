import { IAtualizacaoDetalhadaResponse, IHistoricoSituacaoObject, IPedidoDetalheResponse, IPedidoResponseObject, IResumoResponse } from "./Responses";

export interface ILojaIntegrada {
  pedidos_criados(date: string, offset: number): Promise<IPedidoResponseObject[]>
  pedidos_criados_detalhados(date: string): Promise<IPedidoDetalheResponse[]>
  atualizacoes(date: string, offset: number): Promise<IHistoricoSituacaoObject[]>
  atualizacoes_detalhadas(date: string): Promise<IAtualizacaoDetalhadaResponse[]>
  resumo_atualizacoes(date: string): Promise<IResumoResponse[]>
  detalhe_pedido(id: number): Promise<IPedidoDetalheResponse>
}