'use strict'
// Require gulp
const gulp = require('gulp');
// Require gulp-babel
const babel = require('gulp-babel'); 



/**
*
*  Create a gulp Task, which will only transpile .js files 
*  with gulp-babel. The other files will be copied and mirrored in the new es5 project.
*
* 
*/
gulp.task('sampleTask', () => {

    gulp.src(['.project']).pipe(gulp.dest('../sample'));
    gulp.src(['.classpath']).pipe(gulp.dest('../sample'));
    gulp.src(['.settings/org.eclipse.jdt.core.prefs']).pipe(gulp.dest('../sample/.settings'));
    gulp.src(['.settings/org.eclipse.wst.common.component']).pipe(gulp.dest('../sample/.settings'));
    gulp.src(['.settings/org.eclipse.wst.common.project.facet.core.xml']).pipe(gulp.dest('../sample/.settings'));
    gulp.src(['.settings/org.eclipse.wst.jsdt.ui.superType.container']).pipe(gulp.dest('../sample/.settings'));
    gulp.src(['.settings/org.eclipse.wst.jsdt.ui.superType.name']).pipe(gulp.dest('../sample/.settings'));
    gulp.src(['WebContent/WEB-INF/web.xml']).pipe(gulp.dest('../sample/WebContent/WEB-INF'));
    gulp.src('./WebContent/util/**') .pipe(babel({presets: ['es2015']})).pipe(gulp.dest('../sample/WebContent/util'));
    gulp.src('./WebContent/Component.js').pipe(babel({presets: ['es2015']})).pipe(gulp.dest('../sample/WebContent/'));
    gulp.src('./WebContent/controller/**').pipe(babel({presets: ['es2015']})).pipe(gulp.dest('../sample/WebContent/controller')); 
    gulp.src([
        './WebContent/**',
        '!./WebContent/controller/**',
        '!./WebContent/util/**',
        '!./WebContent/Component.js'
    ]).pipe(gulp.dest('../sample/WebContent/'));
    gulp.src([
        '!./gulpfile.js',
        '!./package.json',
        '!./node_modules',
        '!./node_modules/**',
        './**',
        '!./WebContent/controller/**',
        '!./WebContent/util/**',
        '!./WebContent/Component.js']).pipe(gulp.dest('../sample'));

}); 


gulp.task('default', [
 
    'sampleTask'
], 

() => {

    gulp.watch(['./**', '!./node_modules/**'], ['sampleTask']);

});