const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
// const minifyCSS = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');

//Compile Sass and create a Sourcemap
function css() {
    return src('./sass/*.scss', { sourcemaps: true })
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        // .pipe(minifyCSS())
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('sass/maps'))
        // .pipe(sourcemaps.write())
        .pipe(dest('./'))
        .pipe(browserSync.stream());
}

//JS
function js() {
    return src('./js/*.js', { sourcemaps: true })
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('build.min.js'))
        .pipe(dest('./js/min', { sourcemaps: true }));
}

//Browser Sync
function browser() {
    browserSync.init({
        proxy: 'path/to/server',
        files: [
            './**/*.php'
        ]
    });

    watch('./sass/**/*.scss', css);
    watch('./js/*.js', js).on('change', browserSync.reload);
}

//Default Task
exports.css = css;
exports.js = js;
exports.default = browser;