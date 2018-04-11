var gulp = require('gulp'),
    minify = require('gulp-minify');
    src = './',
    dist = '../dist/';

gulp.task('default', function() {
    gulp.src(src + 'ngExpandable.js')
        .pipe(gulp.dest(dist));
    gulp.src(src + 'ngExpandable.js')
        .pipe(minify({
            ext: '.min.js'
        }))
        .pipe(gulp.dest(dist));
});