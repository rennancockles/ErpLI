import { Router } from "express";
import { LojaIntegradaRouter } from './lojaIntegradaRouter'

const router = Router()

new LojaIntegradaRouter().addRoutes(router)

export { router }