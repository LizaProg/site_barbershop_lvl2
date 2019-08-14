const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');

gulp.task('style', function () {
    return gulp.src('sass/*.scss')
        .pipe(plumber())
        .pipe(concat('app.scss'))
        .pipe(sass.sync({outputStyle: 'compressed'}))
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream())

});


//запустить: gulp server
gulp.task('server', gulp.series('style', function(){
    browserSync.init({
        server: '.',
        notify: false,
        open: true,
        cors: true,
        ui: false
    });

    gulp.watch('sass/**/*.{scss, sass}', gulp.series('style'));
    gulp.watch('*.html').on('change', browserSync.reload);
}));
