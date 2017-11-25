'use strict'

const gulp = require('gulp');
const combine = require('stream-combiner2').obj; // Объединяем потоки

module.exports = function(options) {
  return function() {
    gulp.watch('src/less/**/*.less', gulp.series('style'));
    gulp.watch('src/img/**/*.*', gulp.series('img')).on('unlink', function(filepath) {
      remember.forget('image', path.resolve(filepath));
      delete cached.caches.image[path.resolve(filepath)];
    })
    gulp.watch('src/html/**/*.*', gulp.series('html'))
    gulp.watch('src/fonts/**/*.*', gulp.series('font'))
  }
}