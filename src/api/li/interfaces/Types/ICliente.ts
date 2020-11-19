import { IPessoa } from ".";

export interface ICliente extends IPessoa {
  data_nascimento: string
  email: string
  id: number
  resource_uri: string
  sexo: string
  telefone_celular: string
  telefone_principal: string
}