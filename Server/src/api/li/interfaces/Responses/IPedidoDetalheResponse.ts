import { ICliente, IEnderecoEntrega, IEnvio, IItem, IPagamento, ISituacao } from "../Types";

export interface IPedidoDetalheResponse {
  cliente: ICliente
  cliente_obs: string
  cupom_desconto: string
  data_criacao: string
  data_expiracao: string
  data_modificacao: string
  endereco_entrega: IEnderecoEntrega
  envios: IEnvio[]
  id_anymarket: string
  id_externo: string
  itens: IItem[]
  numero: number
  pagamentos: IPagamento[]
  peso_real: string
  resource_uri: string
  situacao: ISituacao
  utm_campaign: string
  valor_desconto: string
  valor_envio: string
  valor_subtotal: string
  valor_total: string
}