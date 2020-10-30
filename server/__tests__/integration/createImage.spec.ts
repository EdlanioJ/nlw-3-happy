import jwt from 'jsonwebtoken';
import request from 'supertest';
import path from 'path';

import * as factory from '../factories';
import app from '../../src/app';
import { JWT_SECRET } from '../../src/config';
import deleteFilesFromUploadFolderTest from '../utils/deleteFilesFromUploadFolderTest';
import handleConnection from '../utils/handleConnection';
import { response } from 'express';

describe('Create Image', () => {
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

  it('Should create image', async () => {
    const user = await factory.user.create();
    const orphanage = await factory.orphanage.attr('user', user).create();

    const response = await request(app)
      .post('/dashboard/orphanages/image')
      .set('authorization', `Bearer ${user.generateToken()}`)
      .attach('image', path.resolve(__dirname, '..', '1.jpg'))
      .field('orphanageId', orphanage.id);

    expect(response.status).toBe(201);
  });

  it('Should not create image if user is not valid', async () => {
    const user = await factory.user.create();
    const orphanage = await factory.orphanage.attr('user', user).create();

    const token = jwt.sign({ id: 8000 }, JWT_SECRET, { expiresIn: '2d' });

    const response = await request(app)
      .post('/dashboard/orphanages/image')
      .set('authorization', `Bearer ${token}`)
      .attach('image', path.resolve(__dirname, '..', '1.jpg'))
      .field('orphanageId', orphanage.id);

    expect(response.status).toBe(401);
    expect(response.body).toEqual(
      expect.objectContaining({ message: 'usuario não encontado' })
    );
  });

  it('Should not create image if orphanage is not valid', async () => {
    const user = await factory.user.create();
    const orphanage = await factory.orphanage.attr('user', user).create();

    const response = await request(app)
      .post('/dashboard/orphanages/image')
      .set('authorization', `Bearer ${user.generateToken()}`)
      .attach('image', path.resolve(__dirname, '..', '1.jpg'))
      .field('orphanageId', 10024);

    expect(response.status).toBe(401);
    expect(response.body).toEqual(
      expect.objectContaining({ message: 'orfanato não encontado' })
    );
  });
});
