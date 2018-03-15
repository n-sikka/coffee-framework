var gulp = require('gulp'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload');

gulp.task('server', function() {
  connect.server({
    root: './',
    port: 3000,
    livereload: true
  });
});

