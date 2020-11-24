import { Router } from "express-serve-static-core";

export interface IRouter {
  addRoutes(router: Router, rootPath: string): void
}