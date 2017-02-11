// TODO: create all tables in DB and migrations
"use strict";
var express = require("express");
// import * as path from 'path';
// import * as mongoose from 'mongoose';
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var debug = require("debug");
var chalk = require("chalk");
// import * as fileUpload from 'express-fileupload';
// import * as fs from 'fs';
var application_1 = require("config/application");
var passport_1 = require("config/passport");
var session_1 = require("middlewares/session");
var router_1 = require("router");
var orm_1 = require("orm");
// import handleError from './services/handle-error';
// import api from './api';
var app = express();
if (process.env.NODE_ENV !== 'testing') {
    app.use(morgan('dev'));
}
// app.use('/public', express.static(path.resolve('public')));
// app.use('/doc', express.static(path.resolve('doc')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(fileUpload());
app.use(session_1["default"]());
app.use(passport_1["default"]());
// app.use('/api', api);
// app.get('favicon.ico', (req, res) => {
//   res.sendFile(path.resolve('public/favicon.ico'));
// });
// app.get(/^(?!\/public|\/api|\/uploads|\/doc|\/favicon).*$/, function(req, res) {
//   res.sendFile(path.resolve('client-react/index.html'));
// });
// fs.stat(path.resolve('uploads/photos'), function(err) {
//   if (err && err.code === 'ENOENT') {
//     fs.mkdirSync(path.resolve('uploads'));
//     fs.mkdirSync(path.resolve('uploads/photos'));
//   }
// });
// app.use('/uploads/photos', (req, res) => {
//   if (!req.user) {
//     res.status(401);
//     return;
//   }
//
//   res.sendFile(path.resolve(`uploads/photos${req.path}`));
// });
// app.use(handleError);
// process.on('unhandledRejection', (reason: any, promise: any) => {
//   console.log(`Reason: ${reason}`);
//   console.log(Promise);
// });
app.use(router_1["default"]);
orm_1["default"].connect().then(function () {
    app.listen(application_1["default"].port, function () {
        debug('app:init')(chalk.green("App listening on port " + application_1["default"].port));
    });
});
exports.__esModule = true;
exports["default"] = app;
