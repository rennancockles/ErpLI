import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import * as Yup from 'yup';
import User from './User'

@Entity('stores')
export default class Store {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  api_key: string;

  @OneToMany(() => User, user => user.store, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'store_id'})
  users: User[];
}

export const StoreSchema = Yup.object().shape({
  name: Yup.string().required(),
  api_key: Yup.string().required()
})