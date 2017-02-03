import Connection from 'services/orm/connection';

export default class Migrations {
  private connection: Connection;
  private tableExists = false;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  async runMigrations() {
    await this.ensureSchemaMigrationsTableExists();
    const needsToRunMigrations = await this.checkMigrations();
    if (!needsToRunMigrations) {
      return;
    }
  }

  private async checkMigrations() {

  }

  private async ensureSchemaMigrationsTableExists() {
    if (this.tableExists) {
      return;
    }

    await this.connection.query([
      'CREATE TABLE IF NOT EXISTS schema_migrations (',
        'version TIMESTAMP NOT NULL',
      ')'
    ].join(' '));

    this.tableExists = true;
  }
}
