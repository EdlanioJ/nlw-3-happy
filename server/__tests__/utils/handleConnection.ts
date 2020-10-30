import { Connection, getConnection } from 'typeorm';

import createConnection from '../../src/database/connection';

let connection: Connection;
export default {
  async connect() {
    connection = await createConnection('test-connection');

    await connection.dropDatabase();

    await connection.runMigrations();
  },
  async clean() {
    await connection.query('DELETE FROM images');
    await connection.query('DELETE FROM orphanages');
    await connection.query('DELETE FROM users');
  },

  async close() {
    const mainConnection = getConnection();

    await connection.dropDatabase();

    await connection.close();
    await mainConnection.close();
  },
};
