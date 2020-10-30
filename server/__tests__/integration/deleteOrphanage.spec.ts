import jwt from 'jsonwebtoken';
import request from 'supertest';

import * as factory from '../factories';
import app from '../../src/app';
import { JWT_SECRET } from '../../src/config';
import { user } from '../factories';
import deleteFilesFromUploadFolderTest from '../utils/deleteFilesFromUploadFolderTest';
import handleConnection from '../utils/handleConnection';

describe('Delete Orphanage', () => {
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

  it('Should delete an orphanage', async () => {
    const user = await factory.user.create();
    const orphanage = await factory.orphanage.attr('user', user).create();
    const images = await factory.image
      .sequence('orphanage', () => orphanage)
      .createList(5);

    const response = await request(app)
      .del(`/dashboard/orphanages/${orphanage.id}`)
      .set('authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('Should not delete an orphanage if user is not valid', async () => {
    const token = jwt.sign({ id: 8000 }, JWT_SECRET, { expiresIn: '2d' });

    const response = await request(app)
      .del(`/dashboard/orphanages/2`)
      .set('authorization', `Bearer ${token}`);

    expect(response.status).toBe(401);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'usuario não encontado',
      })
    );
  });

  it('Should not be able to delete a non existing orphanage', async () => {
    const user = await factory.user.create();

    const response = await request(app)
      .del(`/dashboard/orphanages/2`)
      .set('authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(401);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'orfanato não encontado',
      })
    );
  });
});
