/**
 * Created by bryannissen on 10/25/15.
 */
var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var Server = require('karma').Server;
var concat = require('gulp-concat');

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('less', function () {
  return gulp.src('./app/styles/less/**/*.less')
      .pipe(less({
        paths: [ path.join(__dirname, 'less', 'includes') ]
      }))
      .pipe(gulp.dest('./app/styles/css'));
});

var jsLocations = [
  './app/bower_components/angular/angular.js',
  './app/bower_components/angular-ui-router/release/angular-ui-router.js',
  './app/main.js',
  './app/components/**/*.js',
  './app/seatingPlan/*.js',
]

gulp.task('scripts', function() {
  return gulp.src(jsLocations)
  .pipe(concat({ path: 'app.js', stat: { mode: 0666 }}))
  .pipe(gulp.dest('./app'));
});
gulp.task('watch', function () {
  watch('./app/styles/less/**/*.less', batch(function (events, done) {
    gulp.start('less', done);
  }));
  watch(jsLocations, batch(function (events, done) {
    gulp.start('scripts', done);
  }))
});