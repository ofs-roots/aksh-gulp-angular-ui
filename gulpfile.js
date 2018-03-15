// npm i -g gulp
// npm i gulp gulp-uglify gulp-rename gulp-concat gulp-header gulp-minify-css gulp-watch
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    header = require('gulp-header'),
    pkg = require('./package.json'),
    minifyCSS = require('gulp-minify-css'),
    clean = require('gulp-clean'),
    watch = require('gulp-watch');
    
    gulp.task('clean', function(){
        gulp.src('./dist')
        .pipe(clean());
    })
gulp.task('scripts', function() {
    gulp.src([
        'node_modules/jquery/dist/jquery.js', // if you need jquery, use "npm i -g bower" and "bower install jquery"
        'node_modules/bootstrap/dist/js/bootstrap.js', // if you need bootstrap, use "npm i -g bower" and "bower install bootstrap"
        'node_modules/angular/angular.js',
        'node_modules/angular-route/angular-route.js',
        'node_modules/jstree/dist/jstree.js',
        'src/js/**/*.js' // our js files
    ])
        // .pipe(concat('myproject.js')) // cancatenation to file myproject.js
        // .pipe(uglify()) // uglifying this file
        // .pipe(rename({suffix: '.min'})) // renaming file to myproject.min.js
        // .pipe(header('/*! <%= pkg.name %> <%= pkg.version %> */\n', {pkg: pkg} )) // banner with version and name of package
        .pipe(gulp.dest('./dist/js/')) // save file to destination directory
});

gulp.task('styles', function() {
    gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.css', // example with installed bootstrap package
        'node_modules/bootstrap/dist/css/bootstrap-grid.css',
        'node_modules/jstree/dist/themes/default/style.css', // example with installed bootstrap package
        'src/css/**/*.css' // our styles
    ])
        .pipe(concat('myproject.css')) // concatenation to file myproject.css
        .pipe(minifyCSS({keepBreaks:false})) // minifying file
        .pipe(rename({suffix: '.min'})) // renaming file to myproject.min.css
        .pipe(header('/*! <%= pkg.name %> <%= pkg.version %> */\n', {pkg: pkg} )) // making banner with version and name of package
        .pipe(gulp.dest('./dist/css/')) // saving file myproject.min.css to this directory
});

gulp.task('watcher', function() {
    gulp.src('src/js/**/*.js')
        .pipe(watch('src/js/**/*.js', function(event) { // if changed any file in "src/scripts" (recursively)
            gulp.run('scripts'); // run task "scripts"
        }));
    gulp.src('src/css/*.css')
        .pipe(watch('src/css/*.css', function(event) {
            gulp.run('styles');
        }));
    gulp.src('src/partials/*.html')
        .pipe(watch('src/partials/*.html', function(event){
            gulp.run('partials');
        }));
        gulp.src('src/index.html')
        .pipe(watch('src/index.html', function(event) {
            gulp.run('copyHtml');
        }));
});

gulp.task('partials',function(){
     gulp.src('src/partials/*.html')
    .pipe(gulp.dest('./dist/partials/'))
});

gulp.task('copyHtml',function(){
    gulp.src('src/index.html')
    .pipe(gulp.dest('./dist'))
   
});


gulp.task('jstree-icons',function(){
    gulp.src(['node_modules/jstree/dist/themes/default/*.png','node_modules/jstree/dist/themes/default/*.gif'])
    .pipe(gulp.dest('./dist/css/'))
});

gulp.task('default', ['scripts', 'styles','copyHtml','partials','jstree-icons']); // start default tasks "gulp"
gulp.task('watch', ['watcher']); // start watcher task "gulp watch"