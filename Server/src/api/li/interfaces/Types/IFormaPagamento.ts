import { IConfiguracaoPagamento } from ".";

export interface IFormaPagamento {
  codigo: string
  configuracoes: IConfiguracaoPagamento
  id: number
  imagem: string
  nome: string
  resource_uri: string
}