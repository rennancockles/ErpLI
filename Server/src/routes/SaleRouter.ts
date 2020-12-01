import { Router } from "express-serve-static-core";
import { IRouter } from "../interfaces/IRouter";
import { SaleController } from '../controllers/SaleController';

export class SaleRouter implements IRouter {
  private controller

  constructor () {
    this.controller = new SaleController()
  }
  
  addRoutes = (router: Router, rootPath: string = ''): void => {
    router.get(`${rootPath}/summary`, this.controller.summary)
    router.get(`${rootPath}/paid`, this.controller.paid)
  }
}