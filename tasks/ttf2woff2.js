'use strict'

const gulp = require('gulp');
const svgSprite = require("gulp-svg-sprites");
const $ = require('gulp-load-plugins')();

var isDevelopment = process.env.NODE_ENV === 'development'; // setx NODE_ENV development && команда галпа

module.exports = function(options) {

  return function() {
    return gulp.src(options.src) // Выберем наш style.less
      .pipe($.plumber({
        errorHandler: $.notify.onError(function (err) {
          return {
              title: 'pug',
              message: err.message
            };
          })
        })
      )
      .pipe($.ttf2woff2({
        clone: true
      })) // Конвертирование и клонирование исходника
      .pipe($.debug({title: 'ttf2woff'})) // Показ происходящего
      .pipe($.if(isDevelopment, gulp.dest('build/fonts/'), gulp.dest('production/fonts/'))) // Cохраним в build или public
  }
}