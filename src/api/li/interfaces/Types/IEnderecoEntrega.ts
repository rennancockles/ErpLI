import { IPessoa } from ".";

export interface IEnderecoEntrega extends IPessoa {
  bairro: string
  cep: string
  cidade: string
  complemento: string
  endereco: string
  estado: string
  id: number
  ie: string
  numero: string
  pais: string
  referencia: string
  rg: string
  tipo: string
}