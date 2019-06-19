/**
 * This file contains a basic middleware for the protected API routes
 *
 * @fileOverview Authentication Guard
 * @author Shashwat Gulyani
 * @version 1.0.0
 */

 /**
  * @module src/auth/authGuard
  */

const winston = require('winston');
const jsonwebtoken = require('./jsonwebtoken');

/**
 * A middleware function to protect Api routes
 *
 * @param {Object} req The request object from the client
 * @param {Object} res A response object
 * @param {*} next Passes the request object to the next middleware
 */
module.exports = (req, res, next) => {
  if (!req.headers.authorization) res.status(401).end('Unauthorized');
  jsonwebtoken.decodeToken(req.headers.authorization, (err, payload) => {
    if (err) {
      switch (err.name) {
        case 'TokenExpiredError':
          res.status(401).end('Unauthorized');
          break;
        case 'JsonWebTokenError':
          winston.error(err.message);
          res.status(500).end('Internal server error');
          break;
        default:
          winston.error(err.message);
          res.status(500).end('Internal server error');
      }
    } else {
      req.user = payload;
      next();
    }
  });
};
