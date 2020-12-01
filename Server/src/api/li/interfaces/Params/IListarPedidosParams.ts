import { IDefaultParams } from ".";

export interface IListarPedidosParams extends IDefaultParams {
  since_criado?: string,
  situacao_id?: number
}