import { Request, Response } from 'express';
import { ICorreios } from '../api/correios/interfaces/ICorreios';

export class CorreiosController {
  private Correios: ICorreios

  constructor (Correios: ICorreios) {
    this.Correios = Correios
  }

  rastreio = async (req: Request, res: Response): Promise<Response> => {
    const { obj } = req.params

    const result = await this.Correios.rastreio(obj)
  
    return res.json({ status: 200, message: 'Ok', data: result })
  }

  geraCodValido = async (req: Request, res: Response): Promise<Response> => {
    const { obj } = req.params

    const result = this.Correios.geraCodValido(obj)
  
    return res.json({ status: 200, message: 'Ok', data: result })
  }
}
