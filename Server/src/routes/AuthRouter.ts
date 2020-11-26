import { Router } from "express-serve-static-core";
import { IRouter } from "../interfaces/IRouter";
import { AuthController } from '../controllers/AuthController';

export class AuthRouter implements IRouter {
  private controller

  constructor () {
    this.controller = new AuthController()
  }
  
  addRoutes = (router: Router, rootPath: string = ''): void => {
    router.post(`${rootPath}/login`, this.controller.login)
    router.post(`${rootPath}/register`, this.controller.register)
  }
}