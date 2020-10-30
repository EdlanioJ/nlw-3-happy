import { Express, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Image from '../models/Image';
import Orphanage from '../models/Orphanage';
import User from '../models/User';
import imagesView from '../views/imagesView';

export default {
  async create(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);
    const userRepositoty = getRepository(User);
    const imageRepository = getRepository(Image);

    const requestImage = request.file as Express.Multer.File;

    const imagePath = requestImage.filename;

    const { orphanageId } = request.body;

    const { userId } = request;

    const user = await userRepositoty.findOne({ id: userId });

    if (!user) {
      return response.status(401).json({ message: 'usuario não encontado' });
    }
    const orphanage = await orphanagesRepository.findOne({
      where: { id: orphanageId, user },
    });

    if (!orphanage) {
      return response.status(401).json({ message: 'orfanato não encontado' });
    }

    const image = imageRepository.create({ path: imagePath, orphanage });

    await imageRepository.save(image);

    return response.status(201).json(imagesView.render(image));
  },
  async delete(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);
    const userRepositoty = getRepository(User);
    const imageRepository = getRepository(Image);

    const { imageId, orphanageId } = request.params;

    const { userId } = request;

    const user = await userRepositoty.findOne({ id: userId });

    if (!user) {
      return response.status(401).json({ message: 'usuario não encontado' });
    }
    const orphanage = await orphanagesRepository.findOne({
      where: { id: orphanageId, user },
    });

    if (!orphanage) {
      return response.status(401).json({ message: 'orfanato não encontado' });
    }

    const image = await imageRepository.findOne({
      where: { id: imageId, orphanage },
    });

    if (!image) {
      return response.status(401).json({ message: 'imagem não encontado' });
    }

    await imageRepository.delete(imageId);

    return response.status(200).send();
  },
};
