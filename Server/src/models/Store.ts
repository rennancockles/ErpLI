import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { Pedido, User } from '.'

@Entity('stores')
export default class Store {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  api_key: string;

  @OneToMany(() => User, user => user.store)
  @JoinColumn({ name: 'store_id'})
  users: User[];

  @OneToMany(() => Pedido, pedido => pedido.store)
  @JoinColumn({ name: 'store_id'})
  pedidos: Pedido[];
}