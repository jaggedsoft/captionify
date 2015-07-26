'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync'),
    minifyCss = require('gulp-minify-css'),
    useMin = require('gulp-usemin'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    jshint = require('gulp-jshint'),
    autoprefixer = require('gulp-autoprefixer'),
    merge = require('merge-stream'),
    mainBowerFiles = require('main-bower-files'),
    gulpFilter = require('gulp-filter'),
    usemin = require('gulp-usemin'),
    minifyHtml = require('gulp-minify-html'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin');

var dest = './',
    src = 'src',
    reload = browserSync.reload;

gulp.task('default', ['serve']);

gulp.task('bower', ['bower-js', 'bower-css']);

gulp.task('bower-js', function() {
    return gulp.src(mainBowerFiles())
        .pipe(gulpFilter('*.js'))
        .pipe(gulp.dest(src + '/js/vendor/'));
});

gulp.task('bower-css', function() {
    return gulp.src(mainBowerFiles())
        .pipe(gulpFilter('*.css'))
        .pipe(gulp.dest(src + '/styles/vendor/'));
});

gulp.task('serve', ['css', 'lint', 'watch'], function() {
    browserSync({
        server: {
            baseDir: src
        },
        port: 9000
    });

    gulp.watch(['*.html', 'css/**/*.css', 'js/**/*.js'], {cwd: src}, reload);
});

gulp.task('prod-serve', ['prod'], function() {
    browserSync({
        server: {
            baseDir: dest
        },
        port: 9000
    });
});

gulp.task('css', function () {
    return merge(
        gulp.src(src + '/styles/**/main.scss')
            .pipe(plumber())
            .pipe(sass())
            .pipe(autoprefixer('last 2 versions'))
            .pipe(gulp.dest(src + '/css')),
        gulp.src(src + '/styles/**/*.css')
            .pipe(gulp.dest(src + '/css'))
        );
});

gulp.task('lint', function() {
    return gulp.src(src + '/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('imagemin', function () {
    return gulp.src(src + '/img/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(dest + '/img'));
});

gulp.task('prod', ['css', 'imagemin', 'lint'], function () {
    return gulp.src(src + '/*.html')
        .pipe(usemin({
            css: [minifyCss(), 'concat'],
            html: [minifyHtml({
                conditionals: true,
                empty: true,
                quotes: true
            })],
            js: [uglify()],
            js1: [uglify()]
        }))
        .pipe(gulp.dest(dest));
});

gulp.task('watch', function() {
    gulp.watch(src + '/styles/**/*(*.scss|*.css)', ['css']);
    gulp.watch(src + '/js/**/*.js', ['lint']);
});