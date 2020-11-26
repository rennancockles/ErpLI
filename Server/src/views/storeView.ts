import Store from '../models/Store'

export default {
  render (store: Store) {
    return {
      id: store.id,
      name: store.name,
      api_key: store.api_key
    }
  },

  renderMany (stores: Store[]) {
    return stores.map(store => this.render(store))
  }
}