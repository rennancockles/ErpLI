import { IDestino, IOEC, IUnidade } from ".";

export interface IEvento {
  tipo: string
  data: string
  hora: string
  criacao: string
  prazoGuarda: string
  diasUteis: string
  descricao: string
  detalhe: string
  status: string
  unidade: IUnidade
  destino: IDestino
  detalheOEC: IOEC
}