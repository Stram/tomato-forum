import * as pg from 'pg';
import * as debug from 'debug';
import * as chalk from 'chalk';

export default class Connection {
  private pool: pg.Pool;
  client: pg.Client;

  constructor(connectionOptions: pg.PoolConfig) {
    this.pool = new pg.Pool(connectionOptions);
  }

  query(queryText: string) {
    debug('orm:connection')(chalk.blue('Running query:'), queryText);
    return this.pool.query(queryText);
  }
}
