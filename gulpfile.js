var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');

gulp.task('browserify', function() {
  var b = browserify();
  b.transform(reactify);
  b.add('./js/app.jsx')
  return b.bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./build'));
});

gulp.task('default', ['browserify']);
