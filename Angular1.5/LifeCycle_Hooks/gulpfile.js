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

var paths = {
    rootPath: 'dist/',
    src: {
        js: ['src/**/*.js'],
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

// gulp.task('dist-js', ['clean-js'], function () {
//     return gulp.src(paths.src.js)
//         .pipe(sourcemaps.init())
//         .pipe(babel({
//             presets: ['es2015'],
//             plugins: ['transform-runtime', 'transform-es2015-classes']
//         }))
//         .pipe(concat('app.bundle.js'))
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest(paths.rootPath + 'app/js/'));
// });

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

gulp.task('dist-app', ['clean-js', 'dist-js-vendor', 'dist-js']);

gulp.task('default', function (done) {
    runSequence('browserify',['dist-app'], 'del', done);
});

gulp.task('browserify', function () {

   return browserify([
        'src/app.js', 
        'src/app.component.js',
        'src/components/hello-world/hello-world.component.js',
        'src/components/hello-world/hello-world.controller.js',
        'src/components/hello-world/index.js'], { debug: true })
        .transform(babelify)
        .bundle()
        .on("error", function (err) { console.log("Error: " + err.message); })
        .pipe(fs.createWriteStream('app.bundle.js'));
});

gulp.task('del', function(){
    return del('app.bundle.js');
});