import { getRepository } from 'typeorm';
import { LojaIntegrada } from '../api/li/LojaIntegrada';
import { Pedido, Store } from '../models';

export class GetPedidos {
  static run = async (store: Store, date: string): Promise<void> => {
    const api_key = store.api_key
    const LI = new LojaIntegrada(api_key)
    
    const detalhePedidosResponse = await LI.pedidos_criados_detalhados(date)
    const detalhePedidos = Pedido.parseMany(detalhePedidosResponse)

    detalhePedidos.forEach(pedido => pedido.store = store)

    const repository = getRepository(Pedido);
    const pedidos = repository.create(detalhePedidos);
    
    repository.save(pedidos)
  }
}
