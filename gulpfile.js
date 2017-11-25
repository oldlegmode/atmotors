'use strict'

function lazyRequireTask(taskName, path, options) {
  options = options || {};
  options.taskName = taskName;
  gulp.task(taskName, function(callback) {
    let task = require(path).call(this, options);

    return task(callback);
  });
}

const gulp = require('gulp');


 // Удаляет директорию build or production
lazyRequireTask('clean', './tasks/clean');

 // Прогоняем js files через eslint
lazyRequireTask('lint', './tasks/lint', {
  src: 'src/js/**/*.js',
  dist: process.cwd() + '/tmp/lintCache.json'
});

 // Сборка стилей build or production
lazyRequireTask('style', './tasks/style', {
  src: 'src/less/**/style.less'
});

 // Синхронизация с браузером
lazyRequireTask('sync', './tasks/sync');

 // Задача watch
lazyRequireTask('watch', './tasks/watch');

  // Оптимизация img

 // Оптимизация jpg png gif
lazyRequireTask('svgSprite', './tasks/svgSprite', {
  src: 'src/img/**/*.svg'
});

 // Оптимизация в спрайты svg
lazyRequireTask('jpgAndPng', './tasks/jpgAndPng', {
  src: 'src/img/**/*.{png,jpg,gif}'
});

 // Общая задача
gulp.task('img', gulp.parallel(
  'svgSprite',
  'jpgAndPng'
));

 // Сборка HTML c помощью pug в build или production взависимости от переменной NODE_ENV
lazyRequireTask('pug', './tasks/pug', {
  src: 'src/pug/**/index.pug'
});

 // Сборка HTML в build или production взависимости от переменной NODE_ENV
lazyRequireTask('html', './tasks/html', {
  src: 'src/html/**/index.html'
});

  // Сборка шрифтов (ttf woff woff2)

 // Конвертация шрифтов ttf 2 woff
lazyRequireTask('ttf2woff', './tasks/ttf2woff', {
  src: 'src/fonts/**/*.ttf'
});
 // Конвертация шрифтов ttf 2 woff2
lazyRequireTask('ttf2woff2', './tasks/ttf2woff2', {
  src: 'src/fonts/**/*.ttf'
});
 // Итоговая задача сборки шрифтов
gulp.task('font', gulp.parallel(
  gulp.parallel('ttf2woff', 'ttf2woff2')
  )
);

 // Сборка в build или production взависимости от переменной NODE_ENV
gulp.task('build', gulp.series(
  'clean', 
  gulp.parallel('html', 'font', 'style', 'img')
  )
);

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'sync')));





