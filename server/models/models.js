import fs from 'fs';

fs.readdirSync(__dirname).forEach(function(file) {
  if (file !== 'models.js') {
    var moduleName = file.split('.')[0];
    exports[moduleName] = require(`./${moduleName}`);
  }
});
