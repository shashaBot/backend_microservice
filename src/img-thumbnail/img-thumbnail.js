/**
 * This file contains all functions required to resize an image
 *
 * @fileOverview Image thumbnail Request
 * @author Shashwat Gulyani.
 * @version 1.0.0
 */

/**
 * @module src/imgThumbnail/imgThumbnail 
 */

const request = require('request');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

/**
 *
 * @property{function(uri, filename, callback)} downloadImage A function that downloads the image from url
 * @property{function(filename, format, callback)} resizeImage A function that resizes the image to 50x50
 */
module.exports = {

  /**
     * A function to download image
     *
     * @param {string} uri The image link provided by the user
     * @param {string} filename The name the user will like to give the image
     * @param {function(filename,format)}
     */
  downloadImage: (uri, filename, callback) => {
    const format = uri.indexOf('jpeg') !== -1 ? uri.substr(-4) : uri.substr(-3);
    request.head(uri, () => {
      request(uri).pipe(fs.createWriteStream(path.join(__dirname, `../output/${filename}.${format}`))).on('close', () => {
        callback(filename, format);
      });
    });
  },

  /**
     * A function to resize images
     *
     * @param {string} filename The name of the image
     * @param {string} format The image format
     * @param {function(filename, format)} callback
     */
  resizeImage: (filename, format, callback) => {
    sharp(path.join(__dirname, `../output/${filename}.${format}`))
      .resize(50, 50)
      .toFile(path.join(__dirname, `../output/${filename}_resized.${format}`), () => {
        callback(filename, format);
      });
  },
};
