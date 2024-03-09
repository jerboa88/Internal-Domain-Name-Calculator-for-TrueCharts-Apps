import gulp from 'gulp';
import typescript from 'gulp-typescript';
import uglify from 'gulp-uglify';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import copy from 'gulp-copy';
import connect from 'gulp-connect';
import gulpSass from 'gulp-sass';
import nodeSass from "node-sass";


const sass = gulpSass(nodeSass);
const globs = {
	ts: 'src/**/*.ts',
	scss: 'src/**/*.scss',
	html: 'src/**/*.html',
	images: 'src/**/*.+(png|jpg|jpeg|gif|svg)',
	other: ['src/site.webmanifest'],
};

// Task to compile TypeScript files to JavaScript
gulp.task('typescript', () => {
	return gulp.src(globs.ts)
		.pipe(typescript())
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

// Task to compile SCSS files to CSS
gulp.task('sass', () => {
	return gulp.src(globs.scss)
		.pipe(
			sass({ outputStyle: 'compressed' })
				.on('error', sass.logError)
		)
		.pipe(gulp.dest('dist'));
});

// Task to minify HTML files
gulp.task('htmlmin', () => {
	return gulp.src(globs.html)
		.pipe(
			htmlmin({
				collapseWhitespace: true,
				collapseBooleanAttributes: true,
				removeComments: true,
				removeEmptyAttributes: true
			})
		)
		.pipe(gulp.dest('dist'));
});

// Task to minify images
gulp.task('imagemin', () => {
	return gulp.src(globs.images)
		.pipe(imagemin())
		.pipe(gulp.dest('dist'));
});

// Task to copy other files from src to dist
gulp.task('copy', () => {
	return gulp.src(globs.other)
		.pipe(copy('dist', { prefix: 1 }));
});

// Task to start HTTP server
gulp.task('serve', () => {
	connect.server({
		root: 'dist',
		port: 8000,
		livereload: true,
	});
});

// Task to reload the server
gulp.task('reload', (done) => {
	gulp.src('dist')
		.pipe(connect.reload());
	done();
});

// Task to watch changes in files
gulp.task('watch', () => {
	gulp.watch(globs.ts, gulp.series('typescript', 'reload'));
	gulp.watch(globs.scss, gulp.series('sass', 'reload'));
	gulp.watch(globs.html, gulp.series('htmlmin', 'reload'));
	gulp.watch(globs.images, gulp.series('imagemin', 'reload'));
	gulp.watch(globs.other, gulp.series('copy', 'reload'));
});

// Build task
gulp.task('build', gulp.parallel('typescript', 'sass', 'htmlmin', 'imagemin', 'copy'));

// Default task
gulp.task('default', gulp.series('build', gulp.parallel('serve', 'watch')));
