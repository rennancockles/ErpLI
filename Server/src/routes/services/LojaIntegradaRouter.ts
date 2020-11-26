import { Router } from "express-serve-static-core";
import { LojaIntegrada } from "../../api/li/LojaIntegrada";
import { LojaIntegradaController } from '../../controllers/LojaIntegradaController';

export class LojaIntegradaRouter {
  private controller

  constructor () {
    const api_key = process.env.LI_API_KEY || '' 
    const LI = new LojaIntegrada(api_key)

    this.controller = new LojaIntegradaController(LI)
  }
  
  addRoutes = (router: Router, rootPath: string = ''): void => {
    router.get(`${rootPath}`, this.controller.atualizacoes)
    router.get(`${rootPath}/pedidos`, this.controller.pedidos_criados)
    router.get(`${rootPath}/resumo`, this.controller.resumo)
    router.get(`${rootPath}/pedido/:id`, this.controller.detalhe_pedido)
  }
}