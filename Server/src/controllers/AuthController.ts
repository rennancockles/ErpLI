import jwt from 'jsonwebtoken'
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { IAuthRequest } from '../interfaces/requests/IAuthRequest';
import { UserRepository } from '../repositories/UserRepository';
import { userView } from '../views';
import { RegisterSchema } from '../models/User';
import { IRegisterRequest } from '../interfaces/requests/IRegisterRequest';

export class AuthController {

  register = async (req: Request, res: Response): Promise<Response> => {        
    const {
      store_name,
      api_key,
      name,
      lastname,
      email,
      password
    } = req.body;

    const registerData: IRegisterRequest = {
      name,
      lastname,
      email,
      password,
      store: {
        name: store_name,
        api_key
      }
    }

    await RegisterSchema.validate(registerData, {
      abortEarly: false
    })

    const repository = getCustomRepository(UserRepository);
    const user = await repository.createAndSave(registerData);

    return res.status(201).json(userView.render(user))
  }

  login = async (req: Request, res: Response): Promise<Response> => {    
    const {
      email,
      password
    } = req.body;

    const data: IAuthRequest = {
      email,
      password
    }

    const repository = getCustomRepository(UserRepository)
    const user = await repository.findByLogin(data);
    
    const token = jwt.sign({ uid: user.id, sid: user.store.id }, process.env.JWT_SECRET||'', {
      expiresIn: '24h'
    })

    res.setHeader('X-AuthToken', `Bearer ${token}`)
    
    return res.status(200).json(userView.render(user))
  }
}
