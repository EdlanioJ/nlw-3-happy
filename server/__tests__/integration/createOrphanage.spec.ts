import jwt from 'jsonwebtoken';
import request from 'supertest';
import path from 'path';

import * as factory from '../factories';
import app from '../../src/app';
import { JWT_SECRET } from '../../src/config';
import deleteFilesFromUploadFolderTest from '../utils/deleteFilesFromUploadFolderTest';
import handleConnection from '../utils/handleConnection';

describe('Create Orphanage', () => {
  beforeAll(async () => {
    await handleConnection.connect();
  });

  beforeEach(async () => {
    await handleConnection.clean();
  });

  afterAll(async () => {
    await handleConnection.close();

    deleteFilesFromUploadFolderTest();
  });

  it('Should create an orphanage', async () => {
    const user = await factory.user.create();

    const response = await request(app)
      .post('/dashboard/orphanages')
      .set('authorization', `Bearer ${user.generateToken()}`)
      .attach('images', path.resolve(__dirname, '..', '1.jpg'))
      .attach('images', path.resolve(__dirname, '..', '1.jpg'))
      .attach('images', path.resolve(__dirname, '..', '1.jpg'))
      .attach('images', path.resolve(__dirname, '..', '1.jpg'))
      .attach('images', path.resolve(__dirname, '..', '1.jpg'))
      .field('name', 'Flor do Sequele')
      .field('latitude', -8.8867698)
      .field('longitude', 13.4858733)
      .field('status', 'public')
      .field(
        'about',
        'O Orfanato inaugurado em 2012, localizado no bairro Txizainga, em Saurimo, comporta para além de dormitórios e espaços de lazer, uma escola de seis salas de aulas do ensino primário.'
      )
      .field('instructions', 'Lave a mão ao entrar')
      .field('opening_hours', 'Flor do Sequele')
      .field('open_on_weekends', true);

    expect(response.status).toBe(201);
  });

  it('Should not create orphanage with invalid user', async () => {
    const user = await factory.user.create();

    const token = jwt.sign({ id: 8000 }, JWT_SECRET, { expiresIn: '2d' });

    const response = await request(app)
      .post('/dashboard/orphanages')
      .set('authorization', `Bearer ${token}`)
      .attach('images', path.resolve(__dirname, '..', '1.jpg'))
      .attach('images', path.resolve(__dirname, '..', '1.jpg'))
      .attach('images', path.resolve(__dirname, '..', '1.jpg'))
      .attach('images', path.resolve(__dirname, '..', '1.jpg'))
      .attach('images', path.resolve(__dirname, '..', '1.jpg'))
      .field('name', 'Flor do Sequele')
      .field('latitude', -8.8867698)
      .field('longitude', 13.4858733)
      .field('status', 'public')
      .field(
        'about',
        'O Orfanato inaugurado em 2012, localizado no bairro Txizainga, em Saurimo, comporta para além de dormitórios e espaços de lazer, uma escola de seis salas de aulas do ensino primário.'
      )
      .field('instructions', 'Lave a mão ao entrar')
      .field('opening_hours', 'Flor do Sequele')
      .field('open_on_weekends', true);

    expect(response.status).toBe(401);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'usuario não encontado, porfavor cadastra-se',
      })
    );
  });
});
