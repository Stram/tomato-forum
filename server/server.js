import express from 'express';
import path from 'path';
import mongoose from 'mongoose';

import api from './api/api';

const app = express();

const DB_USERNAME = 'Brackets';
const DB_PASSWORD = 'Brackets';

mongoose.connect(`mongodb://${DB_USERNAME}:${DB_PASSWORD}@ds019654.mlab.com:19654/express-forum`);

app.get('/', function (req, res) {
  res.sendFile(path.resolve('client/index.html'));
});

app.use('/public', express.static(path.resolve('client')));

app.use('/api', api);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
