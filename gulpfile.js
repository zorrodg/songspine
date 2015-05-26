'use strict';

/**
 * GulpFile
 * @author Andrés Zorro <zorrodg@gmail.com>
 * @package songspine
 */

// Module dependencies
var gulp = require('gulp');
var del = require('del');
var _ = require('lodash');
var path = require('path');
var exec = require('child_process').exec;
var gp = require('gulp-load-plugins')({
      pattern: ['gulp-*', 'gulp.*'],
      replaceString: /\bgulp[\-.]/
    });

// Variables
var pkg = require('./package.json'),
    css = pkg.dependencies;

css = _.map(_.keys(css), function(dep) {
  var dependency = require('./node_modules/' + dep + '/package.json'),
      glob;
  
  if(dependency.main){
    return dependency.main;
  } else {
    glob = _.map(pkg.overrides[dep], function(dependency) {
      return './node_modules/' + dep + '/' + dependency;
    });

    return glob;
  }
});

// Gulp Tasks
gulp.task('default',['sass','css','js:dev','index:dev']);
gulp.task('prod',['sass','css','js:prod','index:prod']);

gulp.task('index:dev', compile('dev'));
gulp.task('index:prod',compile('prod'));

gulp.task('js:prod', function(){
  return exec('jspm bundle-sfx lib/main dist/bundle.js --minify');
});
gulp.task('js:dev', function(){
  return exec('jspm unbundle');
});

gulp.task('server:init', function () {
  return exec('live-server .');
});

gulp.task('watch', ['default', 'server:init'], function(){
  gulp.watch('lib/*.*', ['sass','index:dev']);
});

gulp.task('hooks', function () {
  gulp.src('hooks/*')
    .pipe(gp.sym(function (source) {
      var link = path.join('.git/hooks/', source.relative.split(path.sep)[0]);

      del.sync(link);

      return link;
    }));
});

gulp.task('sass', function(){
  return gulp.src(['lib/*.sass'])
    .pipe(gp.sass())
    .pipe(gp.concat('main.css'))
    .pipe(gp.autoprefixer())
    .pipe(gp.minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('css', function(){
  return gulp.src(_.flatten(css))
    .pipe(gp.concat('vendor.css', {newLine: '\r\n\r\n'}))
    .pipe(gp.autoprefixer())
    .pipe(gp.minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(gulp.dest('dist/'));
});

function compile(env){
  var js, start = '';

  switch(env){
    case 'dev':
      js = [
        'jspm_packages/system.js',
        'config.js'
      ];
      start = ['index.html'];
      break;
    case 'prod':
      js = [
        'jspm_packages/traceur.js',
        'dist/bundle.js'
      ];
      break;
  }

  return function(){
    var jsSources = gulp.src(js, { read:false });
    var startSource = gulp.src(start);

    return gulp.src('index.html')
      .pipe(gp.inject(jsSources, { relative:true }))
      .pipe(gp.inject(startSource, {
        starttag:'<!-- start:js -->',
        transform:function(fp){
          return fp.length ? '<script>System.import("lib/main");</script>':false;
        }
      }))
      .pipe(gulp.dest('.'));
  };
}