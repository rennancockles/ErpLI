import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { IUserRequest } from '../interfaces/requests/IUserRequest';
import { UserSchema } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';
import { userView } from '../views';

export class UserController {

  list = async (req: Request, res: Response): Promise<Response> => {
    const repository = getCustomRepository(UserRepository)

    const users = await repository.find({
      relations: ['store']
    });

    return res.json(userView.renderMany(users));
  }

  get = async (req: Request, res: Response): Promise<Response> => {
    const  { id } = req.params;

    const repository = getCustomRepository(UserRepository)

    const user = await repository.findOneOrFail(id, {
      relations: ['store']
    });

    return res.json(userView.render(user));
  }

  create = async (req: Request, res: Response): Promise<Response> => {      
    const {
      name,
      lastname,
      email,
      password,
      store_id
    } = req.body;

    const userData: IUserRequest = {
      name,
      lastname,
      email,
      password,
      store_id
    }

    await UserSchema.validate(userData, {
      abortEarly: false
    })

    const repository = getCustomRepository(UserRepository);
    const user = await repository.createAndSave(userData);

    return res.status(201).json(userView.render(user))
  }
}
