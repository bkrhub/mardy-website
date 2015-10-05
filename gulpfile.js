var gulp = require('gulp');
var uglify = require('gulp-uglify');
var s3 = require( "gulp-s3" );
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// watch files for changes and reload
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });

  gulp.watch(['*.html', 'css/*.css', 'js/*.js'], {cwd: 'app'}, reload);
});

gulp.task('compress', function() {
  return gulp.src('app/js/*.js', 'app/css/*.css', 'app/*.html')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('default', function() {
  // place code for your default task here
});