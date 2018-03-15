var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util'),
    sassLint = require('gulp-sass-lint'),
    sourcemaps = require('gulp-sourcemaps');
    postcss = require('gulp-postcss');
    autoprefixer = require('gulp-autoprefixer');

var STYLE_PATH = 'src/scss/**/*.scss';

gulp.task('compile-change:scss', function() {
  gulp.watch(STYLE_PATH, ['sass:dev']);
});

// to check sass for any wrong coding conventions
gulp.task('check:sass', function(){
  return gulp.src([STYLE_PATH])
  .pipe(sassLint(
    {
      'endless' : true
    }
  ))
  .pipe(sassLint.format())
})

// compile sass for production
gulp.task('sass', function() {
  return gulp.src([STYLE_PATH])
  .pipe(sourcemaps.init())
  .pipe(concat('index.scss'))
  .pipe(sass().on('error', function(){
    gutil.log(gutil.colors.bgBlue.red('ERROR : SCSS COMPILATION FAILED'));
  }))
  .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
  }))
  .pipe(sourcemaps.write('sourcemaps'))
  .pipe(gulp.dest('src/'))
});


// compile sass for development
gulp.task('sass:dev', function() {
  return gulp.src([STYLE_PATH])
  .pipe(sourcemaps.init())
  .pipe(concat('index.scss'))
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      grid: true
  }))
  .pipe(sourcemaps.write('sourcemaps'))
  .pipe(gulp.dest('src/'))
});


// watcher for any change
gulp.task('watch:style', [
  'compile-change:scss',
  'check:sass',
  'sass:dev'
]);
