import { IEndereco } from ".";

export interface IOEC {
  lista: string
  longitude: string
  latitude: string
  carteiro: string
  distrito: string
  unidade: string
  endereco: IEndereco
}