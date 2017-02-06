import {QueryResult} from 'pg';

import Connection from 'services/orm/connection';
import Migrations from 'services/orm/migrations';
import databaseConfig from 'config/database';

export class Database {
  private connection: Connection;
  private migrations: Migrations;

  constructor() {
    this.createConnection();
    this.createMigrations();
  }

  async connect() {
    await this.migrations.runMigrations();
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
