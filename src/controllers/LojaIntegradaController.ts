import { Request, Response } from 'express';
import { ILojaIntegrada } from '../api/li/interfaces/ILojaIntegrada';

export class LojaIntegradaController {
  private today: string
  private LI: ILojaIntegrada

  constructor (LI: ILojaIntegrada) {
    this.LI = LI
    this.today = new Date().toISOString().split('T')[0]
  }

  atualizacoes = async (req: Request, res: Response): Promise<Response> => {
    const date = req.query.date || this.today

    const result = await this.LI.atualizacoes_detalhadas(date.toString())
  
    return res.json({ status: 200, message: 'Ok', data: result })
  }

  detalhe_pedido = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const result = await this.LI.detalhe_pedido(parseInt(id))
  
    return res.json({ status: 200, message: 'Ok', data: result })
  }

  pedidos_criados = async (req: Request, res: Response): Promise<Response> => {
    const date = req.query.date || this.today

    const result = await this.LI.pedidos_criados_detalhados(date.toString())
  
    return res.json({ status: 200, message: 'Ok', data: result })
  }

  resumo = async (req: Request, res: Response): Promise<Response> => {
    const date = req.query.date || this.today

    const result = await this.LI.resumo_atualizacoes(date.toString())
  
    return res.json({ status: 200, message: 'Ok', data: result })
  }
}
