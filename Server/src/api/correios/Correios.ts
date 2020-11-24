import axios from 'axios'
import { AxiosInstance } from 'axios'
import { ICorreios } from './interfaces/ICorreios'
import { IObjeto } from './interfaces/Types'

export class Correios implements ICorreios {
  private http: AxiosInstance
  
  constructor () {
    this.http = axios.create({
      baseURL: 'http://webservice.correios.com.br/service/rest',
      headers: {
        'Content-Type': 'application/xml',
        accept: '*/*'
      }
    })
  }

  isCod(cod: string): boolean {
    return /^[a-zA-Z]{2}[0-9]{9}[a-zA-Z]{2}$/.test(cod)
  }

  geraCodValido(cod: string): string {
    cod = cod.trim()

    if (![12, 13].includes(cod.length)) 
      return ''

    const prefixo = cod.slice(0,2)
    let numero = cod.slice(2,10)
    const sufixo = cod.slice(cod.length - 2)
    const multiplicadores = [8, 6, 4, 2, 3, 5, 9, 7]

    if (numero.length < 8 && cod.length == 12) {
      const diferenca = 8 - numero.length
      const zeros = '0'.repeat(diferenca)
      numero = zeros + numero
    }

    let soma = 0

    for (let i = 0; i < 8; i++) {
      soma += parseInt(numero[i]) * multiplicadores[i]
    }

    const resto = soma % 11
    let digitoVerificador = ''

    if (resto == 0)
      digitoVerificador = "5"
    else if (resto == 1)
      digitoVerificador = "0"
    else
      digitoVerificador = (11 - parseInt(resto.toString())).toString()

    const codFinal = prefixo + numero + digitoVerificador + sufixo

    return codFinal
  }

  async rastreio(cod: string): Promise<IObjeto | null> {
    if (!this.isCod(cod)) return null

    const body = `
    <rastroObjeto>
      <usuario>${process.env.CORREIOS_USER}</usuario>
      <senha>${process.env.CORREIOS_PWD}</senha>
      <tipo>L</tipo>
      <resultado>T</resultado>
      <objetos>${cod}</objetos>
      <lingua>101</lingua>
      <token>${process.env.CORREIOS_TOKEN}</token>
    </rastroObjeto>
    `
    const { data } = await this.http.post('/rastro/rastroMobile', body)
    let objeto = data.objeto

    if (objeto && objeto.length > 0) {
      objeto = objeto[0]
    }

    return objeto
  }
}