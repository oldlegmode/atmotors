'use strict'

const del = require('del');
const path = require('path');

var isDevelopment = process.env.NODE_ENV === 'development'; // setx NODE_ENV development && команда галпа

  // Удаление директории build or production
module.exports = function(options) {
  return function() {
    if (isDevelopment) {
      return del('build').then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
      });
    } else {
      return del('production').then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
      });
    }
  }
}
