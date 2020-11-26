import { Router } from "express-serve-static-core";
import { IRouter } from "../interfaces/IRouter";
import { StoreController } from '../controllers/StoreController';

export class StoreRouter implements IRouter {
  private controller

  constructor () {
    this.controller = new StoreController()
  }
  
  addRoutes = (router: Router, rootPath: string = ''): void => {
    router.get(`${rootPath}`, this.controller.list)
    router.get(`${rootPath}/:id`, this.controller.get)
    router.post(`${rootPath}`, this.controller.create)
  }
}