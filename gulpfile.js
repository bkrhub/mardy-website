// /////////////////////////////////////////////////////////////////
// Required
// /////////////////////////////////////////////////////////////////

var gulp = require('gulp');
var fs = require('fs')
var uglify = require('gulp-uglify');
var s3 = require("gulp-s3");
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var minifyHTML = require('gulp-minify-html');
var autoprefixer = require('gulp-autoprefixer');
var image = require('gulp-imagemin');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var del = require('del');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// /////////////////////////////////////////////////////////////////
// BrowserSync
// /////////////////////////////////////////////////////////////////

gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: 'app'
        }
    });

    gulp.watch(['*.html', 'css/*.css', 'js/*.js'], {
        cwd: 'app'
    }, reload);
});

// /////////////////////////////////////////////////////////////////
// Javascript Tasks
// /////////////////////////////////////////////////////////////////

gulp.task('js', function() {
    gulp.src('app/js/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest('build/js/'));
});

// /////////////////////////////////////////////////////////////////
// HTML Tasks
// /////////////////////////////////////////////////////////////////

gulp.task('html', function() {
    var opts = {
        conditionals: true,
        spare: true
    };

    gulp.src('app/*.html')
        .pipe(plumber())
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('build/'));
});

// /////////////////////////////////////////////////////////////////
// CSS Tasks
// /////////////////////////////////////////////////////////////////

gulp.task('css', function() {
    gulp.src('app/css/*.css')
        .pipe(plumber())
        .pipe(concat('main.css'))
        .pipe(autoprefixer({
            browsers: ['> 5%'],
            cascade: false
        }))
        .pipe(csso())
        .pipe(gulp.dest('build/css/'));
});

gulp.task('extras', function() {
    gulp.src([
        'app/**'
    ], {
        dot: true
    }).pipe(gulp.dest('build/'));
});

// /////////////////////////////////////////////////////////////////
// Image Compression Tasks
// /////////////////////////////////////////////////////////////////

gulp.task('imagemin', function() {
    gulp.src('app/img/**.*')
    .pipe(image())
    .pipe(gulp.dest('build/img/'))
});

// /////////////////////////////////////////////////////////////////
// Build Tasks
// /////////////////////////////////////////////////////////////////

// gulp.task('build:cleanfolder', function(cb) {
//     del([
//         'build/**'
//     ], cb);
// });

// gulp.task('build:copy', function() {
//     return gulp.src('app/**/*')
//         .pipe(gulp.dest('build/'));
// });

// gulp.task('build:remove', function(cb) {
//     del([
        
//     ], cb);
// });

// gulp.task('build', ['html', 'css', 'js', 'imagemin'], function() {
//     console.log('done')
// });
// 

gulp.task('build:cleanfolder', function(cb) {
    return del([
        'build/**'
        ], cb);
});

gulp.task('build:copy', ['build:cleanfolder'], function(cb) {
    return gulp.src('app/**/*')
    .pipe(gulp.dest('build'))
});

gulp.task('build:delete', ['build:copy'], function() {
    return del([
        'build/css/**',
        'build/js/**',
        'build/img/**',
        'build/less/**',
        'build/*.html'
        ]);
});

gulp.task('build', ['build:delete'], function() {
    return gulp.start('html', 'js', 'css', 'imagemin');
});

// /////////////////////////////////////////////////////////////////
// BrowserSync Build
// /////////////////////////////////////////////////////////////////

gulp.task('build:serve', function() {
    browserSync({
        server: {
            baseDir: 'build'
        }
    });

    gulp.watch(['*.html', 'css/*.css', 'js/*.js'], {
        cwd: 'app'
    }, reload);
});

// /////////////////////////////////////////////////////////////////
// Deployment
// /////////////////////////////////////////////////////////////////

gulp.task('deploy', function() {
    aws = JSON.parse(fs.readFileSync('./aws.json'));
    gulp.src('./app/**/*')
        .pipe(s3(aws));
});

gulp.task('default', function() {
    // place code for your default task here
});
