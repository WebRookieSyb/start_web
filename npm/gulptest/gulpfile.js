var gulp = require('gulp');

gulp.task('hello',function () {
    console.log('你好');
});

gulp.task('default',['hello']);

gulp.task('copy-index',function () {
    return gulp.src('index.html').pipe(gulp.dest('dest'));
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
    return gulp.src('images/**/*').pipe(gulp.dest('dest/image'));
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