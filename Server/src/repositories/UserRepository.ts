import bcrypt from 'bcrypt'
import { EntityRepository, getRepository, Repository } from "typeorm";
import { IUserRequest } from "../interfaces/requests/IUserRequest";
import { Store, User } from '../models';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async createAndSave(userData: IUserRequest) {
    userData.password = await bcrypt.hash(userData.password, 10)

    const storesRepository = getRepository(Store)
    const store = await storesRepository.findOneOrFail(userData.store_id);

    const user = this.create(userData);
    user.store = store

    await this.save(user);

    return user
  }

}