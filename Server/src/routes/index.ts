import { Router } from "express";

import { CorreiosRouter, LojaIntegradaRouter } from './services'

import { AuthRouter } from './AuthRouter'
import { UserRouter } from './UserRouter'
import { SaleRouter } from './SaleRouter'

const router = Router()

new LojaIntegradaRouter().addRoutes(router, '/service/li')
new CorreiosRouter().addRoutes(router, '/service/correios')

new AuthRouter().addRoutes(router, '/auth')
new UserRouter().addRoutes(router, '/users')
new SaleRouter().addRoutes(router, '/sales')

export { router }