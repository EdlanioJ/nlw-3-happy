import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import bcrypt from 'bcryptjs';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';

import User from '../models/User';
import userView from '../views/userView';

export default {
  async create(request: Request, response: Response) {
    const userRepositoty = getRepository(User);

    const { name, email, password, confirm_password } = request.body;

    const data = {
      name,
      email,
      password,
      confirm_password,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required('o nome é obrigatorio'),
      email: Yup.string().email().required('o email é obrigatorio'),
      password: Yup.string().min(8).required('a senha é obrigatoria'),
      comfirm_password: Yup.string().oneOf(
        [Yup.ref('password')],
        'Passwords must match'
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const hashPassword = bcrypt.hashSync(password, 12);

    const findUser = await userRepositoty.findOne({
      where: {
        email,
      },
    });

    if (findUser) {
      return response.status(401).json({ messege: 'Email já utilizado' });
    }

    const user = userRepositoty.create({ ...data, password: hashPassword });

    await userRepositoty.save(user);

    return response.status(201).send();
  },
};
