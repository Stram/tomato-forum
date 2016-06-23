import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import api from './api/api';

const app = express();

const DB_USERNAME = 'Brackets';
const DB_PASSWORD = 'Brackets';

mongoose.connect(`mongodb://${DB_USERNAME}:${DB_PASSWORD}@ds019654.mlab.com:19654/express-forum`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(path.resolve('public')));

app.use('/api', api);

app.get(/^(?!\/public|\/api).*$/, function (req, res) {
  res.sendFile(path.resolve('client/index.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
