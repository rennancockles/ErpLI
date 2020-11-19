import { Request, Response } from 'express';
import { LojaIntegrada } from "../api/li/LojaIntegrada";

const api_key = process.env.LI_API_KEY || ''
const LI = new LojaIntegrada(api_key)
const today = new Date().toISOString().split('T')[0]

export default {
  async atualizacoes (req: Request, res: Response) {
    const date = req.query.date || today

    const result = await LI.atualizacoes_detalhadas(date.toString())
  
    return res.json({ status: 200, message: 'Ok', data: result })
  },

  async detalhe_pedido (req: Request, res: Response) {
    const { id } = req.params

    const result = await LI.detalhe_pedido(parseInt(id))
  
    return res.json({ status: 200, message: 'Ok', data: result })
  },

  async pedidos_criados (req: Request, res: Response) {
    const date = req.query.date || today

    const result = await LI.pedidos_criados_detalhados(date.toString())
  
    return res.json({ status: 200, message: 'Ok', data: result })
  },

  async resumo (req: Request, res: Response) {
    const date = req.query.date || today

    const result = await LI.resumo_atualizacoes(date.toString())
  
    return res.json({ status: 200, message: 'Ok', data: result })
  }
}