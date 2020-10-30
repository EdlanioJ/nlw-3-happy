import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Orphanage from '../models/Orphanage';
import User from '../models/User';
import orphanagesView from '../views/orphanagesView';

export default {
  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);
    const userRepositoty = getRepository(User);

    const { userId } = request;
    const { status } = request.query;

    const user = await userRepositoty.findOne(userId);

    if (!user) {
      return response.status(401).json({ message: 'usuario não encontado' });
    }

    const orphanages = await orphanagesRepository.find({
      where: { user, status },
    });

    return response.status(200).json(orphanagesView.renderMany(orphanages));
  },

  async create(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);
    const userRepositoty = getRepository(User);

    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map((image) => ({ path: image.filename }));
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      status,
    } = request.body;

    const { userId } = request;

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      status,
      images,
    };
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      status: Yup.string().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const user = await userRepositoty.findOne(userId);

    if (!user) {
      return response
        .status(401)
        .json({ message: 'usuario não encontado, porfavor cadastra-se' });
    }

    const orphanage = orphanagesRepository.create({
      ...data,
      user: user,
    });

    await orphanagesRepository.save(orphanage);

    return response.status(201).json(orphanagesView.render(orphanage));
  },

  async delete(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);
    const userRepositoty = getRepository(User);

    const { orphanageId } = request.params;
    const { userId } = request;

    const user = await userRepositoty.findOne(userId);

    if (!user) {
      return response.status(401).json({ message: 'usuario não encontado' });
    }

    const orphanage = await orphanagesRepository.findOne({
      where: {
        user,
        id: Number(orphanageId),
      },
    });

    if (!orphanage) {
      return response.status(401).json({ message: 'orfanato não encontado' });
    }

    await orphanagesRepository.delete({
      id: Number(orphanageId),
      user: user,
    });

    return response.status(200).send();
  },

  async update(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);
    const userRepositoty = getRepository(User);

    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      status,
    } = request.body;

    const { orphanageId } = request.params;
    const { userId } = request;

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      status,
    };
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      status: Yup.string().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const user = await userRepositoty.findOne(userId);

    if (!user) {
      return response.status(401).json({ message: 'usuario não encontado' });
    }

    const orphanage = await orphanagesRepository.findOne({
      where: {
        user,
        id: Number(orphanageId),
      },
    });

    if (!orphanage) {
      return response.status(401).json({ message: 'orfanato não encontado' });
    }

    await orphanagesRepository.update({ id: Number(orphanageId), user }, data);

    return response.status(200).send();
  },
};
