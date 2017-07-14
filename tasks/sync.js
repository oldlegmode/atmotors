'use strict'

const gulp = require('gulp');
const browserSync = require('browser-sync').create();

var isDevelopment = process.env.NODE_ENV === 'development'; // setx NODE_ENV development && команда галпа

module.exports = function(options) {
  return function(){
    var dirName;
    if(isDevelopment) {
      dirName = 'build';
    } else {
      dirName = 'production';
    }
    browserSync.init({
      server: dirName
    });
    gulp.watch(dirName).on('change', browserSync.reload);
  };
}