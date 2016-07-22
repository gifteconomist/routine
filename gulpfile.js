var gulp = require('gulp'),  
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    jade = require('gulp-jade');

var sassMain = ['development/sass/styles.scss'];   
var jsSources = ['development/js/*.js']; 




gulp.task('jade', function() {
  return gulp.src(['development/jade/**/*.jade', '!development/jade/index.jade'])
    .pipe(jade())
    .pipe(gulp.dest('reviews'));
});

gulp.task('jadeIndex', function() {
  return gulp.src('development/jade/index.jade')
    .pipe(jade())
    .pipe(gulp.dest(''));
});

gulp.task('concat', function() {  
    gulp.src(jsSources) 
        .pipe(concat('script.js')) 
        .pipe(uglify()) 
        .pipe(gulp.dest('assets/js')); 
});

gulp.task('watch', function() {  
//    gulp.watch(sassMain,['sass']); 
    gulp.watch('development/**/*.scss', ['css']);
    gulp.watch(jsSources,['concat']); 
    gulp.watch('development/jade/index.jade', ['jadeIndex']);
    gulp.watch('development/jade/**/*.jade', ['jade']);
});

gulp.task('css', function () {
    var processors = [
        autoprefixer(),
        cssnano(),
    ];
    return gulp.src('development/sass/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('default', ['jade', 'jadeIndex', 'css', 'concat', 'watch']);  

