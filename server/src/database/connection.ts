import { createConnection, getConnectionOptions } from 'typeorm';

export default async (name = 'default') => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      name,
      database:
        process.env.NODE_ENV === 'test'
          ? 'happy_test'
          : defaultOptions.database,
    })
  );
};
