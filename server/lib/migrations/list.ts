import * as fs from 'fs';
import * as path from 'path';
import * as moment from 'moment';

export interface MigrationDescriptor {
  timestamp: moment;
  migration: any;
}

export default function getListOfMigrations(): Promise<Array<MigrationDescriptor>> {
  return new Promise((resolve, reject) => {
    const migraionsFolderPath = path.resolve(__dirname, './definitions');
    fs.readdir(migraionsFolderPath, (readMigrationsFolderError, files) => {
      if (readMigrationsFolderError) {
        reject(readMigrationsFolderError);
        return;
      }
      const migrations = files.map((fileName) => {
        return {
          timestamp: moment(),
          migration: require(path.join('migrations/definitions', fileName))
        }
      });

      resolve(migrations);
    });
  });
}