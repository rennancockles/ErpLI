import { Router } from "express";
import { liRouter } from './lojaIntegradaRouter'

const router = Router()

liRouter.addRoutes(router)

export { router }