import { Router } from "express";

import { LojaIntegradaRouter } from './LojaIntegradaRouter'
import { CorreiosRouter } from './CorreiosRouter'

import { AuthRouter } from './AuthRouter'
import { StoreRouter } from './StoreRouter'
import { UserRouter } from './UserRouter'

const router = Router()

new LojaIntegradaRouter().addRoutes(router, '/li')
new CorreiosRouter().addRoutes(router, '/correios')

new AuthRouter().addRoutes(router, '/auth')
new StoreRouter().addRoutes(router, '/lojas')
new UserRouter().addRoutes(router, '/usuarios')

export { router }