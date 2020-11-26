import { Router } from "express-serve-static-core";
import { IRouter } from "../interfaces/IRouter";
import { UserController } from '../controllers/UserController';

export class UserRouter implements IRouter {
  private controller

  constructor () {
    this.controller = new UserController()
  }
  
  addRoutes = (router: Router, rootPath: string = ''): void => {
    router.get(`${rootPath}`, this.controller.list)
    router.get(`${rootPath}/:id`, this.controller.get)
    router.post(`${rootPath}`, this.controller.create)
  }
}