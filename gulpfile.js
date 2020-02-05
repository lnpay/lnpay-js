/**
 * this is the main task runner for managing the SampleSDK
 */

/*
 * define requirements
 * ***********************************************************************************************
 */

let gulp = require('gulp');
let args   = require('yargs').argv;
let concat = require('gulp-concat');
let rename = require('gulp-rename');
let replace = require('gulp-replace');
let uglify = require('gulp-uglify');
let size = require('gulp-size');
let clean = require('gulp-clean');
let bump = require('gulp-bump');
let jshint = require('gulp-jshint');
let stylish = require('jshint-stylish');
let colours = require('colors');
let fs = require('fs');
let exec = require('child_process').exec;
let sys = require('sys');
let tasklist = require('gulp-task-listing');
let runSequence = require('run-sequence');

let PROJECT_BASE_PATH = __dirname + '';

/*
 * gulp default task
 * ***********************************************************************************************
 */

gulp.task('default', tasklist.withFilters(function(task) {
    return (["build","clean","test","bump-major","bump-minor","bump-patch"].indexOf(task) < 0);
}));

/*
 * gulp main tasks
 * ***********************************************************************************************
 */



gulp.task('clean', function (cb) {
  return gulp.src('./dist', { read: false })
    .pipe(clean());
});

gulp.task('bump-patch', function(cb) {
    bumpHelper('patch', cb);
});

gulp.task('bump-minor', function(cb) {
    bumpHelper('minor', cb);
});

gulp.task('bump-major', function(cb) {
    bumpHelper('major', cb);
});




/*
 * gulp helper tasks
 * ***********************************************************************************************
 */

// versioning tasks

gulp.task('npm-bump-patch', function () {
  return gulp.src(['./package.json'])
    .pipe(bump({type:'patch'}))
    .pipe(gulp.dest('./'));
});

gulp.task('npm-bump-minor', function () {
  return gulp.src(['./package.json'])
    .pipe(bump({type:'minor'}))
    .pipe(gulp.dest('./'));
});

gulp.task('npm-bump-major', function () {
  return gulp.src(['./package.json'])
    .pipe(bump({type:'major'}))
    .pipe(gulp.dest('./'));
});

gulp.task('git-describe', function (cb) {
    console.log('Current release is now:');
    executeCommand('git describe --abbrev=0 --tags', cb);
});

gulp.task('git-tag', function(cb) {
    runSequence('git-tag-create', 'git-tag-push', 'git-describe', cb);
});

gulp.task('git-tag-create', function(cb) {
    let pkg = require('./package.json');
    let v = 'v' + pkg.version;
    let message = 'Release ' + v;
    let commandLine = 'git tag -a ' + v + ' -m \'' + message + '\'';
    executeCommand(commandLine, cb);
});

gulp.task('git-tag-push', function(cb) {
    let commandLine = 'git push origin master --tags';
    executeCommand(commandLine, cb);
});

gulp.task('git-tag-commit', function(cb) {
    let pkg = require('./package.json');
    let v = 'v' + pkg.version;
    let message = 'Release ' + v;
    let commandLine = 'git add -A && git commit -a -m\'' + message + '\'';
    executeCommand(commandLine, cb);
});

gulp.task('example-upgrade-tag', function(){
    let pkg = require('./package.json');
    let v = pkg.version;
    let file = 'example/*.html';

    return gulp.src([file])
        .pipe(replace(/lnpay-js-([\d.]+)\.js/g, 'lnpay-js-' + v + '.js'))
        .pipe(gulp.dest('example'));
});

// continous integration tasks

gulp.task('lint', function (cb) {
  return gulp.src('./src/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('karma-tests', function(cb){
    console.log();
    console.log('Run all the tests now');
    let karmaConfigFile = PROJECT_BASE_PATH+'/test/karma.conf.js';
    let commandLine = 'karma start '+karmaConfigFile;
    executeCommand(commandLine, cb);
    console.log();
});

/*
 * helper functions
 * ***********************************************************************************************
 */

// execute the command line command in the shell
function executeCommand(commandLine, cb) {
    exec(commandLine, function(error, stdout, stderr) {
        puts(error, stdout, stderr);
        cb(null); // will allow gulp to exit the task successfully
    });
}

// well display console expressions
function puts(error, stdout, stderr) {
    sys.puts(stdout);
}

// will execute the needed stuff to bump successfully
function bumpHelper(bumpType, cb) {
    runSequence('npm-bump-'+bumpType, 'build', 'example-upgrade-tag', 'git-tag-commit', 'git-tag', cb);
}


gulp.task('test', gulp.series('lint', 'karma-tests'));
gulp.task('build', gulp.series('clean', function (cb) {
    let pkg = require('./package.json');

    return gulp.src('./src/*.js')
        .pipe(concat(pkg.name + '-' + pkg.version + '.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename(pkg.name + '-' + pkg.version + '.min.js'))
        .pipe(uglify())
        .pipe(size({showFiles:true}))
        .pipe(gulp.dest('./dist'));
}));