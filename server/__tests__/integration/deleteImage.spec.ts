import jwt from 'jsonwebtoken';
import request from 'supertest';
import path from 'path';

import * as factory from '../factories';
import app from '../../src/app';
import { JWT_SECRET } from '../../src/config';
import deleteFilesFromUploadFolderTest from '../utils/deleteFilesFromUploadFolderTest';
import handleConnection from '../utils/handleConnection';
import { response } from 'express';

describe('Delete image', () => {
  beforeAll(async () => {
    await handleConnection.connect();
  });

  beforeEach(async () => {
    await handleConnection.clean();
  });

  afterAll(async () => {
    await handleConnection.close();
  });

  it('should delete an image', async () => {
    const user = await factory.user.create();
    const orphanage = await factory.orphanage.attr('user', user).create();
    const image = await factory.image.attr('orphanage', orphanage).create();

    const response = await request(app)
      .del(`/dashboard/orphanages/image/${orphanage.id}/${image.id}`)
      .set('authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('should not delete an image if user is not valid', async () => {
    const token = jwt.sign({ id: 8000 }, JWT_SECRET, { expiresIn: '2d' });

    const user = await factory.user.create();
    const orphanage = await factory.orphanage.attr('user', user).create();
    const image = await factory.image.attr('orphanage', orphanage).create();

    const response = await request(app)
      .del(`/dashboard/orphanages/image/${orphanage.id}/${image.id}`)
      .set('authorization', `Bearer ${token}`);

    expect(response.status).toBe(401);
    expect(response.body).toEqual(
      expect.objectContaining({ message: 'usuario não encontado' })
    );
  });

  it('should not delete an image if orphanage is not valid', async () => {
    const user = await factory.user.create();
    const orphanage = await factory.orphanage.attr('user', user).create();
    const image = await factory.image.attr('orphanage', orphanage).create();

    const response = await request(app)
      .del(`/dashboard/orphanages/image/1000/${image.id}`)
      .set('authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(401);
    expect(response.body).toEqual(
      expect.objectContaining({ message: 'orfanato não encontado' })
    );
  });

  it('should not delete an image does not exists', async () => {
    const user = await factory.user.create();
    const orphanage = await factory.orphanage.attr('user', user).create();

    const response = await request(app)
      .del(`/dashboard/orphanages/image/${orphanage.id}/1000`)
      .set('authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(401);
    expect(response.body).toEqual(
      expect.objectContaining({ message: 'imagem não encontado' })
    );
  });
});
