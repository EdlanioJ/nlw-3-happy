import jwt from 'jsonwebtoken';
import path from 'path';
import request from 'supertest';

import * as factory from '../factories';
import app from '../../src/app';
import { JWT_SECRET } from '../../src/config';
import { user } from '../factories';
import deleteFilesFromUploadFolderTest from '../utils/deleteFilesFromUploadFolderTest';
import handleConnection from '../utils/handleConnection';

describe('Update Orpanage', () => {
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

  it('Should be able to update an orphanage', async () => {
    const user = await factory.user.create();
    const orphanage = await factory.orphanage.attr('user', user).create();
    const images = await factory.image
      .sequence('orphanage', () => orphanage)
      .createList(5);

    const response = await request(app)
      .put(`/dashboard/orphanages/${orphanage.id}`)
      .send({
        name: 'Flor do Sequele',
        latitude: -8.8867698,
        longitude: 13.4858733,
        status: 'public',
        about:
          'O Orfanato inaugurado em 2012, localizado no bairro Txizainga, em Saurimo, comporta para além de dormitórios e espaços de lazer, uma escola de seis salas de aulas do ensino primário.',
        instructions: 'Lave a mão ao entrar',
        opening_hours: '12h as 18h',
        open_on_weekends: true,
      })
      .set('authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('Should no update it user is not valid', async () => {
    const token = jwt.sign({ id: 8000 }, JWT_SECRET, { expiresIn: '2d' });

    const user = await factory.user.create();
    const orphanage = await factory.orphanage.attr('user', user).create();
    const images = await factory.image
      .sequence('orphanage', () => orphanage)
      .createList(5);

    const response = await request(app)
      .put(`/dashboard/orphanages/${orphanage.id}`)
      .send({
        name: 'Flor do Sequele',
        latitude: -8.8867698,
        longitude: 13.4858733,
        status: 'public',
        about:
          'O Orfanato inaugurado em 2012, localizado no bairro Txizainga, em Saurimo, comporta para além de dormitórios e espaços de lazer, uma escola de seis salas de aulas do ensino primário.',
        instructions: 'Lave a mão ao entrar',
        opening_hours: '12h as 18h',
        open_on_weekends: true,
      })
      .set('authorization', `Bearer ${token}`);

    expect(response.status).toBe(401);
    expect(response.body).toEqual(
      expect.objectContaining({ message: 'usuario não encontado' })
    );
  });

  it('Should no update it orphanage is not valid', async () => {
    const user = await factory.user.create();
    const orphanage = await factory.orphanage.attr('user', user).create();
    const images = await factory.image
      .sequence('orphanage', () => orphanage)
      .createList(5);

    const response = await request(app)
      .put(`/dashboard/orphanages/111`)
      .send({
        name: 'Flor do Sequele',
        latitude: -8.8867698,
        longitude: 13.4858733,
        status: 'public',
        about:
          'O Orfanato inaugurado em 2012, localizado no bairro Txizainga, em Saurimo, comporta para além de dormitórios e espaços de lazer, uma escola de seis salas de aulas do ensino primário.',
        instructions: 'Lave a mão ao entrar',
        opening_hours: '12h as 18h',
        open_on_weekends: true,
      })
      .set('authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(401);
    expect(response.body).toEqual(
      expect.objectContaining({ message: 'orfanato não encontado' })
    );
  });
});
