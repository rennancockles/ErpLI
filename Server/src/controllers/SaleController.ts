import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { LojaIntegrada } from '../api/li/LojaIntegrada';
import { Store } from '../models';
import liView from '../views/liView';

export class SaleController {
  private today: string

  constructor () {
    this.today = new Date().toISOString().split('T')[0]
  }

  summary = async (req: Request, res: Response): Promise<Response> => {
    const { storeId } = res.locals
    const date = req.query.date || this.today

    const storeRepository = getRepository(Store)
    const store = await storeRepository.findOneOrFail(storeId);

    const api_key = store.api_key 
    const LI = new LojaIntegrada(api_key)

    const li_summary = await LI.resumo_atualizacoes(date.toString())
        
    return res.json(li_summary);
  }

  paid = async (req: Request, res: Response): Promise<Response> => {
    const { storeId } = res.locals

    const storeRepository = getRepository(Store)
    const store = await storeRepository.findOneOrFail(storeId);

    const api_key = store.api_key 
    const LI = new LojaIntegrada(api_key)

    const li_pagos = await LI.pedidos_pagos_detalhados()
        
    return res.json({ li: liView.renderMany(li_pagos) });
  }
}
