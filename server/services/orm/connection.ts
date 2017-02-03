import * as pg from 'pg';

export default class Connection {
  private pool: pg.Pool;
  client: pg.Client;

  constructor(connectionOptions: pg.PoolConfig) {
    this.pool = new pg.Pool(connectionOptions);
  }

  query(queryText: string) {
    return this.pool.query(queryText);
  }
}
