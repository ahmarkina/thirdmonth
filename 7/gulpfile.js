const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
/*const concat = require('gulp-concat');*/
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const rigger = require('gulp-rigger');
const browserSync = require('browser-sync').create();

gulp.task('css', function () {
    return gulp.src('./src/css/style.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['>1%']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
});

gulp.task('html', function () {
    return gulp.src('./src/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('./build'));
});

gulp.task ('watch', function () {
    gulp.watch('./src/css/*.less', gulp.series('css'));
    gulp.watch('./src/*.html', gulp.series('html')).on('change',browserSync.reload);
});
gulp.task('serve', function () {
    browserSync.init({
        server: true,
        browser:"chrome",
        startPath: '/build',
        notyfy: false,
        open: false
    })
});

gulp.task('dev', gulp.parallel('watch', 'serve'));
