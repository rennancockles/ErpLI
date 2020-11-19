import { IDefaultParams, IListarPedidosParams } from "./Params";
import { IHistoricoSituacaoResponse, IPedidoDetalheResponse, IPedidoResponse } from "./Responses";

export interface ILojaIntegradaAPI {
  listar_pedidos(params: IListarPedidosParams): Promise<IPedidoResponse> 
  detalhes_do_pedido(pedido_id: number): Promise<IPedidoDetalheResponse>
  historico_situacao(params: IDefaultParams): Promise<IHistoricoSituacaoResponse>
}