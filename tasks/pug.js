'use strict'

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const svgSprite = require("gulp-svg-sprites");


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
      .pipe($.debug({title: 'src'})) // Показ происходящего
      .pipe($.pug()) // Компиляция HTML
      .pipe($.debug('pug2')) // Показ происходящего
      .pipe($.if(!isDevelopment, $.htmlmin())) // Минификация HTML
      .pipe($.if(!isDevelopment, $.debug('minify html'))) // Показ происходящего
      .pipe($.if(isDevelopment, gulp.dest('build/'), gulp.dest('production/'))) // Cохраним в build или public
  }
}