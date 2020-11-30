import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { Pedido } from '.';
import { ICliente } from '../../api/li/interfaces/Types';

@Entity('li_clientes')
export default class Cliente {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  li_id: number

  @Column()
  nome: string
  @Column()
  cnpj: string
  @Column()
  cpf: string
  @Column()
  razao_social: string  
  @Column()
  data_nascimento: string
  @Column()
  email: string
  @Column()
  resource_uri: string
  @Column()
  sexo: string
  @Column()
  telefone_celular: string
  @Column()
  telefone_principal: string

  @OneToMany(() => Pedido, pedido => pedido.cliente)
  pedidos: Pedido[];

  static parse(cliente: ICliente)  {
    return {
      li_id: cliente.id,
      nome: cliente.nome,
      cnpj: (cliente.cnpj || '').replace(/\D/, ''),
      cpf: (cliente.cpf || '').replace(/\D/, ''),
      razao_social: cliente.razao_social,
      data_nascimento: cliente.data_nascimento,
      email: cliente.email,
      resource_uri: cliente.resource_uri,
      sexo: cliente.sexo,
      telefone_celular: (cliente.telefone_celular || '').replace(/\D/, ''),
      telefone_principal: (cliente.telefone_principal || '').replace(/\D/, '')
    }
  }

  static parseMany(clientes: ICliente[]) {
    return clientes.map(cliente => this.parse(cliente)) 
  }

}