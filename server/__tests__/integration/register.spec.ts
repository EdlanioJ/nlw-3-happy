import request from 'supertest';

import * as factory from '../factories';
import app from '../../src/app';
import handleConnection from '../utils/handleConnection';

describe('Registration', () => {
  beforeAll(async () => {
    await handleConnection.connect();
  });

  beforeEach(async () => {
    await handleConnection.clean();
  });

  afterAll(async () => {
    await handleConnection.close();
  });

  it('Should register user', async () => {
    const response = await request(app).post('/register').send({
      name: 'Edlânio Júlio',
      email: 'edlanioj@gmail.com',
      password: '12345678',
      confirm_password: '12345678',
    });

    expect(response.status).toBe(201);
  });

  it('Should not register with email that exists', async () => {
    const user = await factory.user
      .attr('email', 'edlanioj@gmail.com')
      .create();

    const response = await request(app).post('/register').send({
      name: 'Edlânio Júlio',
      email: 'edlanioj@gmail.com',
      password: '12345678',
      confirm_password: '12345678',
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual(
      expect.objectContaining({
        messege: 'Email já utilizado',
      })
    );
  });
});
