var gulp = require('gulp'),  
    sass = require('gulp-sass'), 
    postcss = require('gulp-postcss'), //handles css plugins like autoprefixer and cssnano 
    autoprefixer = require('autoprefixer'), //autoprefixes css
    cssnano = require('cssnano'), //minifies css
	sourcemaps = require('gulp-sourcemaps'), //maps css to sass file in the DOM
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jade = require('gulp-jade'),
//	imagemin = require('gulp-imagemin'); //optimize images
	cache = require('gulp-cache') //caches images so that minified images dont get reprocessed



// SASS

var sassSrc = ['app/src/sass/*.scss'],
	sassDist = ['public/css'];

gulp.task('css', function () {
    var processors = [
        autoprefixer(),
        cssnano(), 
    ],
	sassOptions = {
	  errLogToConsole: true,
	  outputStyle: 'compressed'
	};
    return gulp.src(sassSrc)
		.pipe(sourcemaps.init())
        .pipe(sass(sassOptions))
        .pipe(postcss(processors))
		.pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('public/css'));
});

// JAVASCRIPT

var jsSrc = ['app/src/scripts/*.js'],
	jsDist = ['public/js'];

gulp.task('js', function() {  
    gulp.src(jsSrc) 
        .pipe(concat('script.js')) 
        .pipe(uglify()) 
        .pipe(gulp.dest('public/js')); 
});

gulp.task('jade', function() {
  return gulp.src('public/reviews/weedheart.jade')
    .pipe(jade())
    .pipe(gulp.dest('app/dist'));
});
//**jade tasks no longer needed with switch to express
// JADE

//var jadeSrc = ['app/src/jade/**/*.js'],
//    jadeIndexSrc = ['app/src/jade/*.jade'],
//    jadeIncludesSrc = ['app/src/jade/includes/*.jade'],
//    jadeReviewsSrc = ['app/src/jade/reviews/*.jade'];
//
//gulp.task('jadeIndex', function() {
//  return gulp.src(jadeIndexSrc)
//    .pipe(jade())
//    .pipe(gulp.dest(''));
//});
//
//gulp.task('jadeIncludes', function() {
//  return gulp.src(jadeIncludesSrc)
//    .pipe(jade())
//    .pipe(gulp.dest('templates'));
//});
//
//gulp.task('jadeReviews', function() {
//  return gulp.src(jadeReviewsSrc)
//    .pipe(jade())
//    .pipe(gulp.dest('reviews'));
//});
//
//gulp.task('jade', ['jadeIndex', 'jadeIncludes', 'jadeReviews']);

// ASSETS

//gulp.task('images', function(){
//  return gulp.src('app/src/images/**/*.+(png|jpg|jpeg|gif|svg)')
//  .pipe(cache(imagemin({
//      interlaced: true
//    })))
//  .pipe(imagemin())
//  .pipe(gulp.dest('public/img'))
//});

// WATCH

gulp.task('watch', function() {  
    gulp.watch(sassSrc, ['css']);
    gulp.watch(jsSrc, ['js']); 
    gulp.watch('public/reviews/weedheart.jade', ['jade']); 
//	gulp.watch([jadeIndexSrc, jadeIncludesSrc, jadeReviewsSrc], ['jade']);
});


gulp.task('default', ['css', 'js', 'jade', 'watch']);  

