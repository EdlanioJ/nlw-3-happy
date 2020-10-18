import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import * as Yup from 'yup';
import User from '../models/User';

export default {
  async create(request: Request, response: Response) {
    const userRepositoty = getRepository(User);

    const { email, password } = request.body;

    const data = { email, password };

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const user = await userRepositoty.findOne({
      where: { email },
    });

    if (!user) {
      return response.status(404).json({ message: 'email invalido' });
    }

    const checkPassword = user.checkPassword(password);

    if (!checkPassword) {
      return response.status(401).json({ message: 'senha invalida' });
    }

    const token = user.generateToken();

    return response.status(200).json(token);
  },
};
