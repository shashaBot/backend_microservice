/**
 * This file includes the root routes.
 * For this app, the public endpoint is gonna be the route.
 *
 * @fileOverview Public auth route
 * @author Shashwat Gulyani.
 * @version 1.0.0
 */

const express = require('express');

const jsonwebtoken = require('../auth/jsonwebtoken');

const route = express.Router();

route.post('/login', (req, res) => {
  /**
     * @type {Object} Login in details of the user (username and password).
     */
  const credentials = req.body;
  if (!credentials.username || !credentials.password) {
    return res.status(400).json({
      success: false,
      message: 'username and password are required',
    });
  }
  // Generate token
  /** @type {string} token */
  const token = jsonwebtoken.getToken({ username: credentials.username });
  return res.json({
    success: true,
    token,
  });
});

// Export route
module.exports = route;
