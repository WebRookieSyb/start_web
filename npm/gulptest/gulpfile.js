var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');


gulp.task('server',function () {
    connect.server({
        root: 'dest',
        livereload: true
    });
});

gulp.task('hello',function () {
    console.log('你好');
});

gulp.task('default',['hello']);

gulp.task('copy-index',function () {
    return gulp.src('index.html').pipe(gulp.dest('dest'))
      .pipe(connect.reload());
});

// gulp.task('images',function () {
//     return gulp.src('images/*.JPG').pipe(gulp.dest('dest/image'));
// })
// gulp.task('images',function() {
//     return gulp.src('images/*.{JPG,png}').pipe(gulp.dest('dest/image'));
// });
// gulp.task('images',function () {
//     return gulp.src('images/*').pipe(gulp.dest('dest/image'));
// });
gulp.task('images',function (){
    return gulp.src('images/**/*')
      .pipe(imagemin())
      .pipe(gulp.dest('dest/image'));
});

// gulp.task('data',function () {
//     return gulp.src(['json/*.json','xml/*.xml']).pipe(gulp.dest('dest/data'));
// });

gulp.task('data',function () {
    return gulp.src(['josn/*.json','xml/*.xml','!json/secret-*/json']).pipe(gulp.dest('dest/data'));
});

gulp.task('build',['copy-index','images','data'],function () {
    //执行build任务是会先去执行它所依赖的三个任务，这三个任务是同时执行的，当三个任务都执行完才会执行build的任务。
    console.log('编译成功！');
})

gulp.task('watch', function () {
    gulp.watch('index.html',['copy-index']);
    gulp.watch('images/**/*.{jpg,png}',['images']);
    gulp.watch(['json/*.json','xml/*xml','!json/secret-*.json'],['data']);
})

gulp.task('sass',function () {
    return gulp.src('stylesheets/**/*.scss').pipe(sass())
      .pipe(minifyCSS())
      .pipe(gulp.dest('dest/css'));
});

gulp.task('default',['server','watch']);

gulp.task('scripts',function () {
    return gulp.src(['js/a.js','js/b.js'])
      .pipe(concat('c.js'))
      .pipe(gulp.dest('dest/js'))
      .pipe(uglify())
      .pipe(rename('c.min.js'))
      .pipe(gulp.dest('dest/js'));
});
