import { Router } from "express";
import { LojaIntegradaRouter } from './lojaIntegradaRouter'
import { CorreiosRouter } from './CorreiosRouter'

const router = Router()

new LojaIntegradaRouter().addRoutes(router, '/li')
new CorreiosRouter().addRoutes(router, '/correios')

export { router }