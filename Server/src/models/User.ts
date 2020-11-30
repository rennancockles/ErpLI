import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import * as Yup from 'yup';
import { Store } from '.'

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Store, store => store.users, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'store_id'})
  store: Store;
}

export const UserSchema = Yup.object().shape({
  name: Yup.string().required(),
  lastname: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  store_id: Yup.number().required()
})

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().required(),
  lastname: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  store: Yup.object().shape({
    name: Yup.string().required(),
    api_key: Yup.string().required()
  })
})