import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Pedido } from '.';
import { IItem } from '../../api/li/interfaces/Types';

@Entity('li_itens')
export default class Item {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  li_id: number
  
  @Column()
  altura: number
  @Column()
  disponibilidade: number
  @Column()
  largura: number
  @Column()
  linha: number
  @Column()
  nome: string
  @Column()
  peso: number
  @Column()
  preco_cheio: number
  @Column()
  preco_custo: number
  @Column()
  preco_promocional: number
  @Column()
  preco_subtotal: number
  @Column()
  preco_venda: number
  @Column()
  produto: number
  @Column()
  produto_pai: string
  @Column()
  profundidade: number
  @Column()
  quantidade: number
  @Column()
  sku: string
  @Column()
  tipo: string

  @ManyToOne(() => Pedido, pedido => pedido.itens)
  @JoinColumn({ name: 'pedido_id', referencedColumnName: 'li_id'})
  pedido: Pedido

  static parse(item: IItem) {
    const produtoParts = item.produto.split('/')

    return {
      li_id: item.id,
      altura: item.altura,
      disponibilidade: item.disponibilidade,
      largura: item.largura,
      linha: item.linha,
      nome: item.nome,
      peso: parseFloat(item.peso),
      preco_cheio: parseFloat(item.preco_cheio),
      preco_custo: parseFloat(item.preco_custo),
      preco_promocional: parseFloat(item.preco_promocional),
      preco_subtotal: parseFloat(item.preco_subtotal),
      preco_venda: parseFloat(item.preco_venda),
      produto: parseInt(produtoParts[produtoParts.length - 1]),
      produto_pai: item.produto_pai,
      profundidade: item.profundidade,
      quantidade: parseFloat(item.quantidade),
      sku: item.sku,
      tipo: item.tipo
    }
  }

  static parseMany(items: IItem[]) {
    return items.map(item => this.parse(item)) 
  }

}