import * as fs from 'fs';
import * as path from 'path';
import * as moment from 'moment';
import * as chalk from 'chalk';
// import * as randToken from 'rand-token';

function getMigrationName() {
  const date = moment().format('YYYY-MM-DD-HH-mm-ss');
  return `${date}.ts`;
}

function createMigrationFile() {
  console.log('Creating new migration...');
  const filename = path.resolve(__dirname, 'definitions', getMigrationName());
  const templatePath = path.resolve(__dirname, 'template.ts');
  const template = fs.readFileSync(templatePath);
  fs.writeFileSync(filename, template);
  console.log(chalk.green(`Migration ${filename} created`));
}

createMigrationFile();
