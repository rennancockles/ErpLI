import { IEndereco } from ".";

export interface IDestino {
  bairro: string
  local: string
  cidade: string
  uf: string
  codigo: string
  endereco: IEndereco
}