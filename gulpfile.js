/*JS VARIABLES*/
const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const rename = require('gulp-rename');

/* PATH VARIABLES */

//JS
var jsSrc = 'wpss.js';
var jsDist = './';

var scssSrc = 'demo/*.scss';
var cssDist = 'demo/';
/*
Use next generation JavaScript, today.
========================================
*/

gulp.task('babel', () => {
    return gulp.src(jsSrc)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(rename({extname : '.legacy.js'}))
        .pipe(gulp.dest(jsDist));
});

gulp.task('styles',() => {
	return gulp.src(scssSrc)
		.pipe(sass({outputStyle:'compressed'}).on('error',sass.logError))
		.pipe(gulp.dest(cssDist));
});

/*
WATCH
=====
*/
gulp.task('js-watch', ['babel']);
gulp.task('css-watch', ['styles']);

gulp.task('watch', function() {

  gulp.watch(jsSrc, ['js-watch']);
  gulp.watch(scssSrc,['css-watch']);

});