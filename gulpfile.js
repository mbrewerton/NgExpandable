var gulp = require('gulp'),
    minify = require('gulp-minify'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    src = './src/',
    dist = './dist/';

gulp.task('default', function () {
    Compile();
});

gulp.task('watch', function() {
    watch(src + '*.*', function() { Compile(); })
})

function Compile() {
    gulp.src(src + 'ngExpandable.js')
        .pipe(gulp.dest(dist));
    gulp.src(src + 'ngExpandable.js')
        .pipe(minify({
            ext: '.min.js'
        }))
        .pipe(gulp.dest(dist));

    gulp.src(src + 'ngExpandable.scss')
        .pipe(sass())
        .pipe(gulp.dest(dist))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(dist));
}