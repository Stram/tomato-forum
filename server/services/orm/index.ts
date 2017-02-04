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

  query(query: string) {
    if (!query.startsWith('SELECT ')) {
      throw new Error('Query has to start with SELECT command!');
    }
    return this.connection.query(query);
  }

  insert(query: string) {
    if (!query.startsWith('INSERT ')) {
      throw new Error('Creation has to start with INSERT command!');
    }
    return this.connection.query(query);
  }
}

export default new Database();
