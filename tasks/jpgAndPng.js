'use strict'

const gulp = require('gulp');
const svgSprite = require("gulp-svg-sprites");
const $ = require('gulp-load-plugins')();

var isDevelopment = process.env.NODE_ENV === 'development'; // setx NODE_ENV development && команда галпа

module.exports = function(options) {

  return function() {
    return gulp.src(options.src) // Выберем наш style.less
      .pipe($.debug({title: 'src'})) // Показ происходящего
      .pipe($.cached('image')) // Кэширование и сравнение с кэшем
      .pipe($.debug({title: 'cached'})) // Показ происходящего
      .pipe($.remember('image')) // Запоминание старых
      .pipe($.debug({title: 'remember'})) // Показ происходящего
      .pipe($.imagemin()) // Запоминание старых
      .pipe($.debug('minify image')) // Показ происходящего
      .pipe($.if(isDevelopment, gulp.dest('build/img/'), gulp.dest('production/img/'))) // Cохраним в build или public
  }
}

