import Connection from 'lib/orm/connection';
import QueryBuilder, {ColumnType} from 'lib/query-builder';
import getMigrationsList, {MigrationDescriptor} from 'lib/migrations/list';
import moment from 'moment';

export default class Migrations {
  private readonly SCHEMA_VERSION_TABLE_NAME = 'schema_migrations';
  private connection: Connection;
  private tableExists = false;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  async migrate() {
    await this.ensureSchemaMigrationsTableExists();
    const pendingMigrations = await this.getPendingMigrations();
    if (!pendingMigrations.length) {
      return;
    }
    await this.runMigrations(pendingMigrations);
  }

  private async getPendingMigrations() {
    const migrationsList = await getMigrationsList();
    const latestMigrationVersion = await this.getLatestMigrationVersion();
    return this.filterMigrations(migrationsList, latestMigrationVersion);
  }

  private async runMigration(migration: MigrationDescriptor) {
    await migration.migration.up(new QueryBuilder, this.connection.query);
  }

  private async runMigrations(migrations: Array<MigrationDescriptor>) {
    const sortedMigrations = migrations.sort((migration1, migration2) => {
      return migration1.timestamp.isAfter(migration2.timestamp) ? 1 : -1;
    });

    for (let migration of sortedMigrations) {
      await this.runMigration(migration);
    }
  }

  private filterMigrations(migrationsList: Array<MigrationDescriptor>, latestMigrationTimestamp: moment) {
    return migrationsList.filter((migrationObject) => {
      return migrationObject.timestamp.isAfter(latestMigrationTimestamp);
    });
  }

  private async getLatestMigrationVersion() {
    const builder = new QueryBuilder();
    const selectBuilder = builder.select().from(this.SCHEMA_VERSION_TABLE_NAME).sortDesc('version').limit(1);
    const latestMigrationTimestamp = await this.connection.query(selectBuilder.build());
    return latestMigrationTimestamp.rows[0];
  }

  private async ensureSchemaMigrationsTableExists() {
    if (this.tableExists) {
      return;
    }

    const builder = new QueryBuilder();
    const tableBuilder = builder.createTable(this.SCHEMA_VERSION_TABLE_NAME)
      .ifNotExists()
      .addColumn('version', ColumnType.TIMESTAMP, {required: true});

    await this.connection.query(tableBuilder.build());

    this.tableExists = true;
  }
}
