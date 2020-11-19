import { Router } from "express-serve-static-core";
import LojaIntegradaController from '../controllers/LojaIntegradaController';

export const liRouter = {
  addRoutes: (router: Router) => {
    router.get('/li', LojaIntegradaController.atualizacoes)
    router.get('/li/pedidos', LojaIntegradaController.pedidos_criados)
    router.get('/li/resumo', LojaIntegradaController.resumo)
    router.get('/li/pedido/:id', LojaIntegradaController.detalhe_pedido)
  }
}