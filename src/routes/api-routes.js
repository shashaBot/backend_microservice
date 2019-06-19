/**
 * This file includes all api routes.
 * For this app, the protected endpoint are gonna be the api routes.
 *
 * @fileOverview Api Routes
 * @author Shashwat Gulyani.
 * @version 1.0.0
 */

const express = require('express');
const fs = require('fs');
const path = require('path');
const patch = require('../patch/patch');
const imgThumbnail = require('../img-thumbnail/img-thumbnail');
const guard = require('../auth/auth-guard');

const apiRoute = express.Router();

apiRoute.patch('/apply-json-patch', guard, (req, res) => {
  const data = req.body;
  if (!data.doc || !data.patches) {
    return res.status(400).json({
      success: false,
      message: 'Data must be in format {doc: Object, patches: Object[]}',
    });
  }

  // validate patch
  patch.validatePatch(data.doc, data.patches, (isValid) => {
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Your patches are invalid.',
      });
    }

    /** @type {Object} The patched object */
    const patchedDoc = patch.applyPatch(data.doc, data.patches);
    return res.json({
      success: true,
      patchedDoc,
    });
  });
});

apiRoute.post('/create-thumbnail', guard, (req, res) => {
  /** @type {string} Image uri */
  const { imageUri } = req.body;
  /** @type {string} Filename */
  const { filename } = req.body;

  if (!imageUri) return res.status(400).json({ success: false, message: 'imageUri not found' });
  if (!filename) return res.status(400).json({ success: false, message: 'filename not found' });
  if (filename.indexOf('.') !== -1) return res.status(400).json({ success: false, message: 'Filename must not contain a .' });

  const imageRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg))/i;
  if (!imageRegex.test(imageUri)) return res.status(400).json({ success: false, message: 'invalid url' });

  imgThumbnail.downloadImage(imageUri, filename, (downloadedFilename, downloadedFileFormat) => {
    imgThumbnail.resizeImage(downloadedFilename, downloadedFileFormat, (resizedFilename, resizedFileFormat) => {
      const img = fs.readFileSync(path.join(__dirname, `../output/${resizedFilename}_resized.${resizedFileFormat}`));
      res.writeHead(200, { 'Content-type': `image/${resizedFileFormat}` });
      res.end(img, 'binary');
    });
  });
});

// Export route
module.exports = apiRoute;
