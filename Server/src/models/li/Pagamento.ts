import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Pedido } from '.';
import { IPagamento } from '../../api/li/interfaces/Types';

@Entity('li_pagamentos')
export default class Pagamento {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  li_id: number
  
  @Column()
  authorization_code: string
  @Column()
  bandeira: string
  @Column()
  banco: string
  codigo_retorno_gateway: string
  @Column()
  forma_pagamento: string
  @Column()
  forma_pagamento_nome: string
  @Column()
  identificador_id: string
  @Column()
  mensagem_gateway: string
  @Column()
  pagamento_tipo: string
  @Column()
  numero_parcelas: number
  @Column()
  valor_parcela: number
  @Column()
  transacao_id: string
  @Column()
  valor: number
  @Column()
  valor_pago: number

  @ManyToOne(() => Pedido, pedido => pedido.pagamentos)
  @JoinColumn({ name: 'pedido_id', referencedColumnName: 'li_id'})
  pedido: Pedido

  static parse(pagamento: IPagamento) {
    return {
      li_id: pagamento.id,
      authorization_code: pagamento.authorization_code,
      bandeira: pagamento.bandeira,
      banco: pagamento.banco,
      codigo_retorno_gateway: pagamento.codigo_retorno_gateway,
      forma_pagamento: pagamento.forma_pagamento.codigo,
      forma_pagamento_nome: pagamento.forma_pagamento.nome,
      identificador_id: pagamento.identificador_id,
      mensagem_gateway: pagamento.mensagem_gateway,
      pagamento_tipo: pagamento.pagamento_tipo,
      numero_parcelas: pagamento.parcelamento.numero_parcelas || 1,
      valor_parcela: pagamento.parcelamento.valor_parcela || parseFloat(pagamento.valor),
      transacao_id: pagamento.transacao_id,
      valor: parseFloat(pagamento.valor),
      valor_pago: parseFloat(pagamento.valor_pago)
    }
  }

  static parseMany(pagamentos: IPagamento[]) {
    return pagamentos.map(pagamento => this.parse(pagamento)) 
  }

}