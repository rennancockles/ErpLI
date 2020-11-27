import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { IUserRequest } from '../interfaces/requests/IUserRequest';
import { UserSchema } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';
import { userView } from '../views';

export class UserController {

  list = async (req: Request, res: Response): Promise<Response> => {
    const { storeId } = res.locals
    const repository = getCustomRepository(UserRepository)

    let users = await repository.find({
      where: { store: { id: storeId } },
      relations: ['store']
    });
    
    return res.json(userView.renderMany(users));
  }

  get = async (req: Request, res: Response): Promise<Response> => {
    const { storeId } = res.locals
    const { id } = req.params

    const repository = getCustomRepository(UserRepository)

    const user = await repository.findOneOrFail(
      { 
        id: parseInt(id), 
        store: { id: storeId } 
      }, 
      {
        relations: ['store']
      }
    );

    return res.json(userView.render(user));
  }

  create = async (req: Request, res: Response): Promise<Response> => {  
    const { storeId } = res.locals    
    const {
      name,
      lastname,
      email,
      password
    } = req.body;

    const userData: IUserRequest = {
      name,
      lastname,
      email,
      password,
      store_id: storeId
    }

    await UserSchema.validate(userData, {
      abortEarly: false
    })

    const repository = getCustomRepository(UserRepository);
    const user = await repository.createAndSave(userData);

    return res.status(201).json(userView.render(user))
  }
}
