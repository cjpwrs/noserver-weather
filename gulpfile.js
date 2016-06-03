/**
 * Created by cjpowers on 6/2/16.
 */
var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var sass = require('gulp-sass');


gulp.task('es6', function () {
    return gulp.src('./js/*.js')
    .pipe(babel({
        "presets": ['es2015']
    }))
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist'));
})

gulp.task('sass', function () {
    return gulp.src('./styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css'))
})


gulp.watch('./styles/*.scss', ['sass'])
gulp.watch('./js/*.js', ['es6'])

gulp.task('default', ['es6', 'sass'])