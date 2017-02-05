import * as session from 'express-session';
import applicationConfig from 'config/application';

import orm from 'services/orm'

const Store = session.Store;

class SessionStore extends Store {
  tableName = 'sessions';

  constructor(options?: any) {
    super(options);

    this.createTable();

    this.get = async function(hash: string, cb: Function) {
      const result = await orm.query(`SELECT data FROM ${this.tableName} WHERE key = ${hash}`);
      const item = JSON.parse(result.rows[0].data || '{}');
      cb(null, item);
    }

    this.set = async function(hash: string, data: {}, cb: Function) {
      await orm.insert(`INSERT INTO ${this.tableName} (key, data) VALUES (${hash}, ${JSON.stringify(data)})`);
      cb();
    }

    this.destroy = async function(hash: string, cb: Function) {
      await orm.destroy(`DELETE FROM ${this.tableName} WHERE key = ${hash}`);
      cb();
    }
  }

  private async createTable() {
    await orm.create(`CREATE TABLE IF NOT EXISTS ${this.tableName} (key varchar NOT NULL COLLATE "default", data json NOT NULL)
      WITH (OIDS=FALSE);
      ALTER TABLE ${this.tableName} ADD CONSTRAINT sessionKey PRIMARY KEY (key) NOT DEFERRABLE INITIALLY IMMEDIATE`);
  }
}

export default function() {
  return session({
    secret: applicationConfig.sessionSecretKey,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 100 // 30 days
    },
    store: new SessionStore()
  });
}
