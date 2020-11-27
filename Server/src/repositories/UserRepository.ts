import bcrypt from 'bcrypt'
import { EntityRepository, getRepository, Repository } from "typeorm";
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError'
import { IAuthRequest } from '../interfaces/requests/IAuthRequest';
import { IRegisterRequest } from '../interfaces/requests/IRegisterRequest';
import { IUserRequest } from "../interfaces/requests/IUserRequest";
import { Store, User } from '../models';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async createAndSave(userData: IUserRequest | IRegisterRequest) {
    userData.password = await bcrypt.hash(userData.password, 10)

    const user = this.create(userData);

    const storesRepository = getRepository(Store)

    if ('store_id' in userData) { 
      const store = await storesRepository.findOneOrFail(userData.store_id);
      user.store = store
    }

    await this.save(user);

    return user
  }

  async findByLogin(loginData: IAuthRequest) {

    const user = await this.findOneOrFail({ email: loginData.email }, {
      relations: ['store']
    });

    if (!user || !await bcrypt.compare(loginData.password, user.password)) throw new EntityNotFoundError(User, loginData)

    return user
  }

}