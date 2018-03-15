var gulp = require('gulp');
    rename = require('gulp-rename'),
    es = require('event-stream'),
    inject = require('gulp-inject');

var STYLES_PATH = 'src/index.css'

gulp.task('inject', function () {
  var target = gulp.src('index.sample.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:

  var sources = gulp.src([STYLES_PATH], {read: true});

  return target.pipe(inject(sources))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('', {overwrite: true}));
});