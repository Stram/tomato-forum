import {QueryResult} from 'pg';

import Connection from 'lib/orm/connection';
import Migrations from 'lib/orm/migrations';
import databaseConfig from 'config/database';

export class Database {
  private connection: Connection;
  private migrations: Migrations;

  constructor() {
    this.createConnection();
    this.createMigrations();
  }

  async connect() {
    await this.migrations.migrate();
  }

  private createConnection() {
    this.connection = new Connection(databaseConfig);
  }

  private createMigrations() {
    this.migrations = new Migrations(this.connection);
  }

  query(query: string):Promise<QueryResult> {
    return this.connection.query(query);
  }
}

export default new Database();
