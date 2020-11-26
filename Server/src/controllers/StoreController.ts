import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Store, { StoreSchema } from '../models/Store';

export class StoreController {

  list = async (req: Request, res: Response): Promise<Response> => {
    const repository = getRepository(Store)

    const stores = await repository.find();

    return res.json(stores);
  }

  get = async (req: Request, res: Response): Promise<Response> => {
    const  { id } = req.params;

    const repository = getRepository(Store)

    const store = await repository.findOneOrFail(id);

    return res.json(store);
  }

  create = async (req: Request, res: Response): Promise<Response> => {      
    const {
      name,
      api_key
    } = req.body;

    const data = {
      name,
      api_key
    }

    await StoreSchema.validate(data, {
      abortEarly: false
    })

    const repository = getRepository(Store)

    const store = repository.create(data);

    await repository.save(store);

    return res.status(201).json(store)
  }
}
