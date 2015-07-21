var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var mocha = require('gulp-mocha');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var file = require('gulp-file');
var argv = require('yargs').argv;
var shell = require('gulp-shell');
var minifyCss = require('gulp-minify-css');
var env = require('gulp-env');

var path = {
  HTML: 'client/portal/index.html',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST: 'client/dist/portal',
  DEST_BUILD: 'client/dist/portal/build',
  DEST_SRC: 'client/dist/portal/src',
  ENTRY_POINT: './client/portal/js/components/app.js',
  TEST_DIR: ['spec/*.js', 'spec/**/*.js']
};

var path2 = {
  HTML: 'client/login/index.html',
  MINIFIED_OUT: 'login.build.min.js',
  OUT: 'login.build.js',
  DEST: 'client/dist/login',
  DEST_BUILD: 'client/dist/login/build',
  DEST_SRC: 'client/dist/login/src',
  ENTRY_POINT: './client/login/js/components/login.js',
  TEST_DIR: ['spec/*.js', 'spec/**/*.js']
};

gulp.task('minify-css-portal', function() {
  return gulp.src('client/portal/styles/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('client/dist/portal/styles'));
});

gulp.task('minify-css-login', function() {
  return gulp.src('client/login/styles/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('client/dist/login/styles'));
});

gulp.task('copy-css-portal', function(){
  gulp.src('client/portal/styles/*.css')
    .pipe(gulp.dest('client/dist/portal/styles'));
});

gulp.task('copy-css-login', function(){
  gulp.src('client/login/styles/*.css')
    .pipe(gulp.dest('client/dist/login/styles'));
});

gulp.task('htmlReplaceDev1', function(){
  gulp.src(path.HTML)
  .pipe(htmlreplace({
    'js': 'src/' + path.OUT
  }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('htmlReplaceDev2', function(){
  gulp.src(path2.HTML)
  .pipe(htmlreplace({
    'js': 'src/' + path2.OUT
  }))
    .pipe(gulp.dest(path2.DEST));
});

gulp.task('watch1', function(){
  gulp.watch(path.HTML, [ 'htmlReplaceDev1' ]);
  gulp.watch('client/portal/styles/styles.css', [ 'copy-css-portal' ]);

  var watcher = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function(){
    watcher.bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC));
      console.log('Updated1!');
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('watch2', function(){
  gulp.watch(path.HTML, [ 'htmlReplaceDev2' ]);
  gulp.watch('client/login/styles/styles.css', [ 'copy-css-login' ]);

  var watcher = watchify(browserify({
    entries: [path2.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function(){
    watcher.bundle()
      .pipe(source(path2.OUT))
      .pipe(gulp.dest(path2.DEST_SRC));
      console.log('Updated2!');
  })
    .bundle()
    .pipe(source(path2.OUT))
    .pipe(gulp.dest(path2.DEST_SRC));
});

gulp.task('test', function(){
  env({
    vars: {
        NODE_ENV: "test",

    }
  });
  gulp.src(path.TEST_DIR, {read: false})
          .pipe(mocha({reporter: 'nyan'}))
          .once('end', function() {
            process.exit();
          });
});

gulp.task('shell-db-create', ['write-personal-config'], shell.task([
  'psql postgres -c "CREATE DATABASE dev_supportal"',
  'psql postgres -c "CREATE DATABASE test_supportal"'
]));

gulp.task('shell-local-migrate', ['shell-db-create'], shell.task([
  'sequelize db:migrate --config server/config/personal_config.json --migrations-path server/migrations'
]));

gulp.task('shell-test-migrate', ['shell-db-create'], shell.task([
  'sequelize db:migrate --config server/config/personal_config.json --migrations-path server/migrations --env test'
]));

gulp.task('write-personal-config', function(cb) {
  var user = argv.user;

  var json = {
    "development": {
      "username": user,
      "password": null,
      "database": "dev_supportal",
      "host": "127.0.0.1",
      "dialect": "postgres"
    },
    "test": {
      "username": user,
      "password": null,
      "database": "test_supportal",
      "host": "127.0.0.1",
      "dialect": "postgres"
    }
  };

  var stringify = JSON.stringify(json);
  file('personal_config.json', stringify)
    .pipe(gulp.dest('server/config'));

  var environment = 'DATABASE_URL=postgres://'+user+'@localhost:5432/dev_supportal\nTEST_DATABASE_URL=postgres://'+user+'@localhost:5432/test_supportal\n';

  file('.env', environment)
    .pipe(gulp.dest(''));

  cb()
});

gulp.task('build', function(){
  browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
  })
  .bundle()
  .pipe(source(path.MINIFIED_OUT))
  .pipe(streamify(uglify(path.MINIFIED_OUT)))
  .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('build2', function(){
  browserify({
    entries: [path2.ENTRY_POINT],
    transform: [reactify],
  })
  .bundle()
  .pipe(source(path2.MINIFIED_OUT))
  .pipe(streamify(uglify(path2.MINIFIED_OUT)))
  .pipe(gulp.dest(path2.DEST_BUILD));
});


gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'build/' + path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('replaceHTML2', function(){
  gulp.src(path2.HTML)
    .pipe(htmlreplace({
      'js': 'build/' + path2.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path2.DEST));
});

gulp.task('default', [ 'htmlReplaceDev1', 'htmlReplaceDev2', 'copy-css-portal', 'copy-css-login', 'watch1', 'watch2' ]);

gulp.task('production', [ 'replaceHTML', 'build', 'replaceHTML2', 'build2', 'minify-css-portal', 'minify-css-login' ]);

gulp.task('setup', [ 'write-personal-config',
    'shell-db-create',
    'shell-local-migrate',
    'shell-test-migrate' ]);
