import { Router } from "express";
// import { createUserController } from "./useCases/CreateUser";
import { LojaIntegrada } from "./api/li/LojaIntegrada"

const router = Router()

router.get('/', async (req, res) => {
  const api_key = process.env.LI_API_KEY || ''
  const LI = new LojaIntegrada(api_key)

  const result = await LI.atualizacoes_por_data('2020-11-18')
  // console.log(result[0])
  // console.log(result.length)

  return res.json({ status: 200, message: 'Ok', data: result })
})

export { router }