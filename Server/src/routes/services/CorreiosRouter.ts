import { Router } from "express-serve-static-core";
import { Correios } from "../../api/correios/Correios";
import { CorreiosController } from '../../controllers/CorreiosController';
import { IRouter } from "../../interfaces/IRouter";

export class CorreiosRouter implements IRouter {
  private controller

  constructor () {
    const CorreiosAPI = new Correios()
    
    this.controller = new CorreiosController(CorreiosAPI)
  }
  
  addRoutes = (router: Router, rootPath: string = ''): void => {
    router.get(`${rootPath}/rastreio/:obj`, this.controller.rastreio)
    router.get(`${rootPath}/valida/:obj`, this.controller.geraCodValido)
  }
}