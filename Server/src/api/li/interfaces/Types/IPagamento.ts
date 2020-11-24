import { IFormaPagamento, IParcelamento } from ".";

export interface IPagamento {
  authorization_code: string
  bandeira: string
  banco: string
  codigo_retorno_gateway: string
  forma_pagamento: IFormaPagamento
  id: number
  identificador_id: string
  mensagem_gateway: string
  pagamento_tipo: string
  parcelamento: IParcelamento
  transacao_id: string
  valor: string
  valor_pago: string
}