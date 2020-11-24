import { IObjeto } from "./Types";

export interface ICorreios {
  isCod(cod: string): boolean
  geraCodValido(cod: string): string
  rastreio(cod: string): Promise<IObjeto | null>
}