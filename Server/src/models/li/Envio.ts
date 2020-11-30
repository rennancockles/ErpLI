import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Pedido } from '.';
import { IEnvio } from '../../api/li/interfaces/Types';

@Entity('li_envios')
export default class Envio {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  li_id: number

  @Column()
  data_criacao: string
  @Column()
  data_modificacao: string
  @Column()
  forma_envio: string
  @Column()
  objeto: string
  @Column()
  prazo: number
  @Column()
  valor: number

  @ManyToOne(() => Pedido, pedido => pedido.envios)
  @JoinColumn({ name: 'pedido_id', referencedColumnName: 'li_id'})
  pedido: Pedido;

  static parse(envio: IEnvio) {
    return {
      li_id: envio.id,
      data_criacao: envio.data_criacao,
      data_modificacao: envio.data_modificacao,
      forma_envio: envio.forma_envio.nome,
      objeto: envio.objeto,
      prazo: envio.prazo,
      valor: parseFloat(envio.valor)
    }
  }

  static parseMany(envios: IEnvio[]) {
    return envios.map(envio => this.parse(envio)) 
  }

}