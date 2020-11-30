import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { Pedido } from '.';
import { IEnderecoEntrega } from '../../api/li/interfaces/Types';

@Entity('li_enderecos')
export default class Endereco {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  li_id: number

  @Column()
  bairro: string
  @Column()
  cep: string
  @Column()
  cidade: string
  @Column()
  cnpj: string
  @Column()
  complemento: string
  @Column()
  cpf: string
  @Column()
  endereco: string
  @Column()
  estado: string
  @Column()
  ie: string
  @Column()
  nome: string
  @Column()
  numero: string
  @Column()
  pais: string
  @Column()
  razao_social: string
  @Column()
  referencia: string
  @Column()
  rg: string
  @Column()
  tipo: string

  @OneToOne(() => Pedido, pedido => pedido.endereco)
  pedido: Pedido;

  static parse(endereco: IEnderecoEntrega) {
    return {
      li_id: endereco.id,
      bairro: endereco.bairro,
      cep: (endereco.cep || '').replace(/\D/, ''),
      cidade: endereco.cidade,
      cnpj: (endereco.cnpj || '').replace(/\D/, ''),
      complemento: endereco.complemento,
      cpf: (endereco.cpf || '').replace(/\D/, ''),
      endereco: endereco.endereco,
      estado: endereco.estado,
      ie: endereco.ie,
      nome: endereco.nome,
      numero: endereco.numero,
      pais: endereco.pais,
      razao_social: endereco.razao_social,
      referencia: endereco.referencia,
      rg: (endereco.rg || '').replace(/\D/, ''),
      tipo: endereco.tipo
    }
  }

  static parseMany(enderecos: IEnderecoEntrega[]) {
    return enderecos.map(endereco => this.parse(endereco)) 
  }

}