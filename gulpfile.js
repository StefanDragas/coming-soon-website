var gulp = require('gulp');
var plumber = require('gulp-plumber');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var htmlInjector = require('bs-html-injector');

var htmlFile = './dist/index.html';
var cssFile = './dist/css/styles.css';
var jadeFile = './src/index.jade';
var sassFile = './src/sass/styles.sass';

gulp.task('jade', function () {
    return gulp.src(jadeFile)
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./dist/'));
        //.pipe(reload({
        //    stream: true
        //}));
});

gulp.task('sass', function () {
    return gulp.src(sassFile)
        .pipe(plumber())
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        // .on('error', sass.logError))
        .pipe(postcss([ autoprefixer() ]))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('server', ['sass', 'jade'], function () {
    browserSync.use(htmlInjector, {
        files: htmlFile
    });
    browserSync.init({
        server: "./dist/",
        open: false
    });
});

gulp.task('watch', ['server'], function() {
    gulp.watch(jadeFile, ['jade']);
    gulp.watch(sassFile, ['sass']);
});

gulp.task('default', ['watch']);