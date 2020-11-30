import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import { IPedidoDetalheResponse } from '../../api/li/interfaces/Responses';
import { Cliente, Endereco, Envio, Item, Pagamento } from '.';
import { Store } from '..';

@Entity('li_pedidos')
export default class Pedido {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  li_id: number
  
  @Column()
  cliente_obs: string
  @Column()
  cupom_desconto: string
  @Column()
  data_criacao: string
  @Column()
  data_expiracao: string
  @Column()
  data_modificacao: string
  @Column()
  id_anymarket: string
  @Column()
  id_externo: string
  @Column()
  peso_real: number
  @Column()
  resource_uri: string
  @Column()
  situacao: string
  @Column()
  utm_campaign: string
  @Column()
  valor_desconto: number
  @Column()
  valor_envio: number
  @Column()
  valor_subtotal: number
  @Column()
  valor_total: number

  @ManyToOne(() => Cliente, cliente => cliente.pedidos, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'cliente_id', referencedColumnName: 'li_id'})
  cliente: Cliente;

  @OneToOne(() => Endereco, endereco => endereco.pedido, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'endereco_id', referencedColumnName: 'li_id'})
  endereco: Endereco;

  @OneToMany(() => Envio, envio => envio.pedido, {
    cascade: ['insert', 'update']
  })
  envios: Envio[];

  @OneToMany(() => Item, item => item.pedido, {
    cascade: ['insert', 'update']
  })
  itens: Item[]

  @OneToMany(() => Pagamento, pagamento => pagamento.pedido, {
    cascade: ['insert', 'update']
  })
  pagamentos: Pagamento[]

  @ManyToOne(() => Store, store => store.users, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'store_id'})
  store: Store;

  static parse(pedidoDetalhe: IPedidoDetalheResponse)  {
    return {
      li_id: pedidoDetalhe.numero,
      cliente: Cliente.parse(pedidoDetalhe.cliente),
      cliente_obs: pedidoDetalhe.cliente_obs,
      cupom_desconto: pedidoDetalhe.cupom_desconto,
      data_criacao: pedidoDetalhe.data_criacao,
      data_expiracao: pedidoDetalhe.data_expiracao,
      data_modificacao: pedidoDetalhe.data_modificacao,
      endereco: Endereco.parse(pedidoDetalhe.endereco_entrega),
      envios: Envio.parseMany(pedidoDetalhe.envios),
      id_anymarket: pedidoDetalhe.id_anymarket,
      id_externo: pedidoDetalhe.id_externo,
      itens: Item.parseMany(pedidoDetalhe.itens),
      pagamentos: Pagamento.parseMany(pedidoDetalhe.pagamentos),
      peso_real: parseFloat(pedidoDetalhe.peso_real),
      resource_uri: pedidoDetalhe.resource_uri,
      situacao: pedidoDetalhe.situacao.codigo,
      utm_campaign: pedidoDetalhe.utm_campaign,
      valor_desconto: parseFloat(pedidoDetalhe.valor_desconto),
      valor_envio: parseFloat(pedidoDetalhe.valor_envio),
      valor_subtotal: parseFloat(pedidoDetalhe.valor_subtotal),
      valor_total: parseFloat(pedidoDetalhe.valor_total),
      store: {}
    }
  }

  static parseMany(pedidos: IPedidoDetalheResponse[])  {
    return pedidos.map(pedido => this.parse(pedido)) 
  }

}