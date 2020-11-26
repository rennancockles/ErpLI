import { User } from '../models'
import { storeView } from '.'

export default {
  render (user: User) {
    return {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      store: storeView.render(user.store)
    }
  },

  renderMany (users: User[]) {
    return users.map(user => this.render(user))
  }
}