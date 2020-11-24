import { IEvento } from ".";

export interface IObjeto {
  cepDestino: string
  dataPostagem: string
  eventos: IEvento[]
  numero: string
  categoria: string
  sigla: string
  nome: string
  json: string
}