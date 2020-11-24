import { IPedidoDetalheResponse } from "."

export interface IResumoResponse {
  situacao: string
  quantidade: number
  valor_total: number
  pedidos: IPedidoDetalheResponse[]
}