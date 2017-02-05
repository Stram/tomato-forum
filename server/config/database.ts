import * as pg from 'pg';

const environment = process.env.NODE_ENV;

const databaseConfig: pg.PoolConfig = {};

if (environment === 'development') {
  databaseConfig['database'] = 'tomato-forum-dev';
} else if (environment === 'test') {
  databaseConfig['database'] = 'tomato-forum-test';
} else if (environment === 'production') {
  databaseConfig['database'] = 'tomato-forum';
}

export default databaseConfig;
