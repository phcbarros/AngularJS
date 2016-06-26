var gulp = require('gulp');
var run = require('gulp-run');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var del = require('del');
var fs = require('fs');
var babelify = require('babelify');
var browserify = require('browserify');
var less = require('gulp-less');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });

var paths = {
    rootPath: 'dist/',
    src: {
        js: ['src/**/*.js'],
        css: ['src/**/*.less']
    },
    vendor: {
        js: ['node_modules/angular/angular.min.js']
    }
};

gulp.task('clean-js', function () {
    return gulp.src(paths.rootPath + 'app/js/')
        .pipe(clean());
});

gulp.task('dist-js', ['browserify'], function () {
    return gulp.src('app.bundle.js')
        .pipe(gulp.dest(paths.rootPath + 'app/js/'));
});

gulp.task('browserify', function () {
   return browserify('src/app.js', { debug: true })
        .transform(babelify)
        .bundle()
        .on("error", function (err) { console.log("Error: " + err.message); })
        .pipe(fs.createWriteStream('app.bundle.js'));
});

gulp.task('del', function(){
    return del('app.bundle.js');
});

gulp.task('clean-js-vendor', function () {
    return gulp.src(paths.rootPath + 'vendor/js/')
        .pipe(clean());
});

gulp.task('clean-vendor', function () {
    return gulp.src(paths.rootPath + 'vendor')
        .pipe(clean());
});

gulp.task('dist-js-vendor', function () {
    return gulp.src(paths.vendor.js)
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.bundle.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.rootPath + '/vendor/js'));
});

gulp.task('clean-dist-css', function() {
    return gulp.src(paths.rootPath + 'app/css/')
        .pipe(clean());
});

gulp.task('dist-css', ['clean-dist-css'], function(){
    return gulp.src(paths.src.css)
        .pipe(sourcemaps.init())
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(concat('styles.bundle.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.rootPath + 'app/css/'));
});

gulp.task('dist-app', ['clean-js', 'dist-js-vendor', 'dist-js', 'dist-css']);

gulp.task('default', function (done) {
    runSequence('browserify',['dist-app'], 'del', done);
});
