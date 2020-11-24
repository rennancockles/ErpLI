import { IEndereco } from ".";

export interface IUnidade {
  tipounidade: string
  local: string
  sto: string
  codigo: string
  uf: string
  cidade: string
  endereco: IEndereco
}