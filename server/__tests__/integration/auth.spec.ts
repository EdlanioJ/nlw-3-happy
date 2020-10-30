import bcrypt from 'bcryptjs';
import request from 'supertest';
import jwt from 'jsonwebtoken';

import * as factory from '../factories';
import { JWT_SECRET } from '../../src/config';
import app from '../../src/app';
import handleConnection from '../utils/handleConnection';

interface Decoded {
  id: string;
}
describe('Authentication', () => {
  beforeAll(async () => {
    await handleConnection.connect();
  });

  beforeEach(async () => {
    await handleConnection.clean();
  });

  afterAll(async () => {
    await handleConnection.close();
  });

  it('Should authenticate user', async () => {
    const password = bcrypt.hashSync('12345678', 12);
    const user = await factory.user.attr('password', password).create();

    const response = await request(app).post('/auth').send({
      password: '12345678',
      email: user.email,
    });

    const { token } = response.body;

    const decoded = jwt.decode(token, { json: true });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(decoded).toHaveProperty('id');
    expect(decoded?.id).toBe(user.id);
  });

  it('Should not authenticate with unregistered email', async () => {
    const response = await request(app).post('/auth').send({
      password: '12345678',
      email: 'paul@gmail.com',
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'email não encontado',
      })
    );
  });

  it('Should not authenticate with wrong password', async () => {
    const user = await factory.user.create();

    const response = await request(app).post('/auth').send({
      password: '12345678',
      email: user.email,
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'senha invalida',
      })
    );
  });

  it('should not be able to access private route with invalid token', async () => {
    const response = await request(app)
      .get('/dashboard/orphanages')
      .set('Authorization', 'Bearer 124567890');

    expect(response.status).toBe(401);
  });

  it('should not be able to access private route if token is not provided', async () => {
    const response = await request(app).get('/dashboard/orphanages');

    expect(response.status).toBe(401);
    expect(response.body).toEqual(
      expect.objectContaining({ message: 'Token não encontado' })
    );
  });

  it('should be able to access private route if autenticated', async () => {
    const user = await factory.user.create();

    const response = await request(app)
      .get('/dashboard/orphanages')
      .query({ status: 'public' })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('should not be able to access private route user is not valid', async () => {
    const token = jwt.sign({ id: 8000 }, JWT_SECRET, { expiresIn: '2d' });
    const user = await factory.user.create();

    const response = await request(app)
      .get('/dashboard/orphanages')
      .query({ status: 'public' })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(401);
    expect(response.body).toEqual(
      expect.objectContaining({ message: 'usuario não encontado' })
    );
  });
});
