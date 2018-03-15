var gulp = require('gulp'),
    fs = require('fs');
    gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass');
    
/*import files from 'gulp/'' */
fs.readdirSync(__dirname + '/gulp').forEach(function(task) {
    require('./gulp/' + task)
})

// enable watch for scripts and styles and create js and style in dist/
gulp.task('watch', ['watch:style']);

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./",
        open: false,
    });

    gulp.watch("src/scss/**/*.scss", ['sass']);
    gulp.watch("./index.sample.html").on('change', function() {
        gulp.start('sass:dev')
        gulp.start('inject')        
    });
    gulp.watch('./index.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve', 'watch']);