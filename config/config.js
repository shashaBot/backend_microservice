/**
 * The configuration file for this app
 *
 * @fileOverview This file contains all configuration for this app.
 * @author Shashwat Gulyani
 * @version 1.0.0
 * @property {Object} jsonwebtoken Object containing all keys and configurations needed by jwt.
 */


module.exports = {
  /**
     * @typedef {Object} jsonwebtoken
     * @property {string} secretOrPublicKey Secret key for signing token
     */
  jsonwebtoken: {
    secretOrPublicKey: 'itsasecret',
  },
};
