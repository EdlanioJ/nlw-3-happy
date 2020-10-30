import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Orphanage from '../models/Orphanage';
import orphanageView from '../views/orphanagesView';

export default {
  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ['images'],
      where: { status: 'public' },
    });

    return response.json(orphanageView.renderMany(orphanages));
  },

  async show(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const { id } = request.params;

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images'],
    });

    return response.json(orphanageView.render(orphanage));
  },
};
