import { IFormaEnvio } from ".";

export interface IEnvio {
  data_criacao: string
  data_modificacao: string
  forma_envio: IFormaEnvio
  id: number
  objeto: string
  prazo: number
  valor: string
}