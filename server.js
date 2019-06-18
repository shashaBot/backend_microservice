/**
 * This is the entry fille for this app.
 *
 * @fileOverview This is the entry file for this app.
 * @author Shashwat Gulyani
 * @version 1.0.0
 */


const express = require('express');
const bodyParser = require('body-parser');
const winston = require('winston');
const routes = require('./routes');

const apiRoutes = require('./routes/api-routes');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// use middleware
app.use('/', routes);
app.use('/api', apiRoutes);

// configure logger
winston.configure({
  transports: [
    new (winston.transports.File)({ filename: 'app.log' }),
  ],
});
winston.add(winston.transports.Console);

// http listen on HOST and PORT
app.listen(PORT, HOST);
winston.info(`App listening on : ${HOST}:${PORT}`))

// exporting server app for testing
module.exports = app
