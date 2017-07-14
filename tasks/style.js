'use strict'

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const combine = require('stream-combiner2').obj;
const cleanCSS = require('gulp-clean-css');

var isDevelopment = process.env.NODE_ENV === 'development'; // setx NODE_ENV development && команда галпа

module.exports = function(options) {

  return function (callback) {
    return combine(
      gulp.src(options.src) // Выберем наш style.less
      .pipe($.plumber({
        errorHandler: $.notify.onError(function (err) {
          return {
              title: 'style',
              message: err.message
            };
          })
        })
      )
      .pipe($.debug({title: 'src'})) // Показ происходящего
      .pipe($.if(isDevelopment, $.sourcemaps.init())) //Инициализируем sourcemap при NODE_ENV === 'development'
      .pipe($.less()) // Скомпилируем
      .pipe($.debug({title: 'less'})) // Показ происходящего
      .pipe($.autoprefixer({browserslist: [
                        "ie >= 10",
                        "Firefox  >= 25",
                        "Chrome >= 58",
                        "iOS >= 8",
                      ]})) // Добавим вендорные префиксы
      .pipe($.debug({title: 'prefixer'})) // Показ происходящего
      .pipe($.if(!isDevelopment, cleanCSS())) // Сожмем при NODE_ENV === 'development'
      .pipe($.if(!isDevelopment, $.debug({title: 'cleanCSS'}))) // Показ происходящего при NODE_ENV === 'development'
      .pipe($.if(!isDevelopment, $.rename('style.min.css'))) // Переименуем
      .pipe($.if(!isDevelopment, $.debug({title: 'rename in style.min'}))) //Показ происходящего
      .pipe($.if(isDevelopment, $.sourcemaps.write())) // Пропишем карты
      .pipe(gulp.dest(function() {
        var dirName;
        if(isDevelopment) {
          return dirName = 'build/css/';
        } else {
          return dirName = 'production/css/';
        }
      })) // Cохраним в build или public
    );
  };
}

