const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');

// 编译 Sass/SCSS 文件
function compileSass() {
    return gulp.src('./**/*.+(sass|scss)') // 当前文件夹及子文件夹下的所有 .sass 或 .scss 文件
        .pipe(sourcemaps.init()) // 初始化 sourcemaps
        .pipe(sass().on('error', sass.logError)) // 编译 sass/scss 至 css
        .pipe(sourcemaps.write()) // 写入 sourcemaps
        .pipe(gulp.dest('../css')); // 输出到上一个文件夹的 css 文件夹中
}

// 监控文件变化
function watchFiles() {
    gulp.watch('./**/*.+(sass|scss)', compileSass); // 监控所有 .sass 和 .scss 文件的变化
}

// 默认任务
exports.default = watchFiles;
