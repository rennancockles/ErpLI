import 'dotenv/config'
import './database/connection'

import { getRepository } from 'typeorm'
import { Store } from './models'
import { GetPedidos } from './cli/getPedidos'


function getDate ():string {
  let date
  
  try {
    const dateParamIndex = process.argv.indexOf('-d') + 1
    date = new Date(process.argv[dateParamIndex])
    
    if (date.toString() === 'Invalid Date') throw new Error()
    
  } catch {
    date = new Date()
  }

  return date.toISOString().split('T')[0]
}

function getStores() {
  const repository = getRepository(Store);
  return repository.find();
}

setTimeout(async () => {
  const date = getDate()
  const stores = await getStores()

  for (let index = 0; index < stores.length; index++) {
    const store = stores[index];
    
    GetPedidos.run(store, date)
  }

}, 1000);


