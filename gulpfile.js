var gulp = require('gulp');
var inject = require('gulp-inject');
var _ = require('lodash');
var gp = require('gulp-load-plugins')({
      pattern: ['gulp-*', 'gulp.*'],
      replaceString: /\bgulp[\-.]/
    });
var exec = require('child_process').exec;

var pkg = require('./package.json'),
    css = pkg.dependencies;

css = _.map(_.keys(css), function(dep) {
  var dependency = require('./node_modules/' + dep + '/package.json');
  
  if(dependency.main){
    return dependency.main;
  } else {
    return './node_modules/' + dep + '/' + pkg.overrides[dep];
  }
});

// Gulp Tasks
gulp.task('default',['sass','css','js:dev'], compile('dev'));
gulp.task('prod',['sass','css','js:prod'], compile('prod'));

gulp.task('js:prod', function(){
  return exec('jspm bundle-sfx lib/main dist/bundle.js --minify');
});
gulp.task('js:dev', function(){
  return exec('jspm unbundle');
});

gulp.task('sass', function(){
  return gulp.src(['lib/*.sass'])
    .pipe(gp.sass())
    .pipe(gp.concat('main.css'))
    .pipe(gp.autoprefixer())
    .pipe(gp.cssmin())
    .pipe(gulp.dest('dist/'));
});

gulp.task('css', function(){
  return gulp.src(css)
    .pipe(gp.concat('vendor.css'))
    .pipe(gp.autoprefixer())
    .pipe(gp.cssmin())
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
      .pipe(inject(jsSources, { relative:true }))
      .pipe(inject(startSource, {
        starttag:'<!-- start:js -->',
        transform:function(fp){
          return fp.length ? '<script>System.import("lib/main");</script>':false;
        }
      }))
      .pipe(gulp.dest('.'));
  };
}