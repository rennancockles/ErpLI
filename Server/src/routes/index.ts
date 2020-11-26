import { Router } from "express";

import { LojaIntegradaRouter } from './LojaIntegradaRouter'
import { CorreiosRouter } from './CorreiosRouter'

import { StoreRouter } from './StoreRouter'
import { UserRouter } from './UserRouter'

const router = Router()

new LojaIntegradaRouter().addRoutes(router, '/li')
new CorreiosRouter().addRoutes(router, '/correios')

new StoreRouter().addRoutes(router, '/lojas')
new UserRouter().addRoutes(router, '/usuarios')

export { router }