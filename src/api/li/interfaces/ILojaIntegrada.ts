import { IHistoricoSituacaoObject, IPedidoDetalheResponse, IPedidoResponseObject } from "./Responses";

export interface ILojaIntegrada {
  pedidos_criados(date: string, offset: number): Promise<IPedidoResponseObject[]>
  pedidos_criados_detalhados(date: string): Promise<IPedidoDetalheResponse[]>
  atualizacoes_por_data(date: string, offset: number): Promise<IHistoricoSituacaoObject[]>
}