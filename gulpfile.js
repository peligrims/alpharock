var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var gulpIf = require('gulp-if');
var ftp  = require('vinyl-ftp');
var bourbon  = require('node-bourbon');
var browserSync = require('browser-sync').create();



var config = {
    paths: {
        sass: 'wp-content/themes/test/stylesheet.sass',

    },
    output: {
        cssName: 'style.css',
        path: 'wp-content/themes/test'
    },
    isDevelop: true
};

gulp.task('sass', function () {
    return gulp.src(config.paths.sass)
        .pipe(gulpIf(config.isDevelop, sourcemaps.init()))
        .pipe(sass())
        .pipe(concat(config.output.cssName))
        .pipe(autoprefixer())
        .pipe(gulpIf(!config.isDevelop, cleanCss()))
        .pipe(gulpIf(config.isDevelop, sourcemaps.write()))
        .pipe(gulp.dest(config.output.path))
        .pipe(browserSync.stream());
});

gulp.task('serve', function () {
    browserSync.init({
        proxy: "wp1.loc",
        notify: false
    });


});
gulp.task('watch', function () {
    gulp.watch('*.php').on('change', browserSync.reload);
    gulp.watch('wp-content/themes/test/', ['sass']);
});

// Выгрузка изменений на хостинг
gulp.task('deploy', function() {
    var conn = ftp.create({
        host:      'hostname.com',
        user:      'username',
        password:  'userpassword',
        parallel:  10,
        log: gutil.log
    });
    var globs = [
        'catalog/view/theme/test/**'
    ];
    return gulp.src(globs, {buffer: false})
        .pipe(conn.dest('/path/to/folder/on/server'));
});

gulp.task('default', ['serve', 'watch', 'sass']);

