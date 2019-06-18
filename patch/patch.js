/**
 * This file contains all functions for patching and validating a json patch
 *
 * @fileOverview JSON PATCH
 * @author Shashwat Gulyani.
 * @version 1.0.0
 */

const jsonPatch = require('fast-json-patch');
const winston = require('winston');

/**
 * @property {function(doc, patches)} applyPatch
 * @property {function(doc, patches, callback)} validatePatch
 */

module.exports = {

  /**
     * A function to apply patch
     *
     * @param {Object} doc The object to which patch will be applied
     * @param {Object[]} patches An array of patches to apply
     *
     * @returns {Object} The patched object
     */
  applyPatch: (doc, patches) => jsonPatch.applyPatch(doc, patches).newDocument,

  /**
     * A Function to validate patch
     *
     * @param {Object} doc The object to which patch will be applied
     * @param {Object[]} patches An array of patches to apply
     * @param {function(isValid)} callback Resolves if patch is valid, rejects otherwise
     *
     * @returns {function} A callback
     */
  validatePatch: (doc, patches, callback) => {
    /** @type {Array|undefined} */
    const errors = jsonPatch.validate(patches, doc);
    if (!errors || errors.length === 0) {
      return callback(true);
    }
    winston.warn('Invalid patch');
    return callback(false);
  },
};
