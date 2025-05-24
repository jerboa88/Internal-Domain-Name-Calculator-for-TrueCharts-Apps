import gulp from 'gulp';
import typescript from 'gulp-typescript';
import uglify from 'gulp-uglify';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import copy from 'gulp-copy';
import connect from 'gulp-connect';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import cypress from 'cypress';

const sass = gulpSass(dartSass);
const outputFolder = 'dist';
const port = 8000;
const globs = {
	ts: 'src/**/*.ts',
	scss: 'src/**/*.scss',
	html: 'src/**/*.html',
	images: 'src/**/*.+(png|jpg|jpeg|gif|svg)',
	other: ['src/site.webmanifest'],
};

// Task for minifying and compiling TypeScript files to JavaScript
function compileTypescript() {
	return gulp
		.src(globs.ts)
		.pipe(typescript())
		.pipe(uglify())
		.pipe(gulp.dest(outputFolder));
}

// Task for minifying and compiling SCSS files to CSS
function compileSass() {
	return gulp
		.src(globs.scss)
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(gulp.dest(outputFolder));
}

// Task for minifying HTML files
function minifyHtml() {
	return gulp
		.src(globs.html)
		.pipe(
			htmlmin({
				collapseWhitespace: true,
				collapseBooleanAttributes: true,
				removeComments: true,
				removeEmptyAttributes: true,
			}),
		)
		.pipe(gulp.dest(outputFolder));
}

// Task for minifying images
function minifyImages() {
	return gulp.src(globs.images).pipe(imagemin()).pipe(gulp.dest(outputFolder));
}

// Task for copying miscellaneous files from src/ to dist/
function copyFiles() {
	return gulp.src(globs.other).pipe(copy(outputFolder, { prefix: 1 }));
}

// Task for starting an HTTP server
function startServer() {
	return connect.server({
		root: outputFolder,
		port: port,
		livereload: true,
	});
}

// Task for running tests with Cypress
function runTests(done) {
	connect.server({
		root: outputFolder,
		port: port + 1,
	});

	cypress.run().then((results) => {
		connect.serverClose();

		if (results.totalFailed > 0) {
			done(new Error('Cypress tests failed'));
		}

		done();
	});
}

// Task to reload the web server
function reloadServer(done) {
	gulp.src(outputFolder).pipe(connect.reload());
	done();
}

// Task to watch for changes in files
function watch() {
	gulp.watch(globs.ts, gulp.series(compileTypescript, reloadServer));
	gulp.watch(globs.scss, gulp.series(compileSass, reloadServer));
	gulp.watch(globs.html, gulp.series(minifyHtml, reloadServer));
	gulp.watch(globs.images, gulp.series(minifyImages, reloadServer));
	gulp.watch(globs.other, gulp.series(copyFiles, reloadServer));
}

// Task for building the project
const buildProject = gulp.parallel(
	compileTypescript,
	compileSass,
	minifyHtml,
	minifyImages,
	copyFiles,
);
const devWatch = gulp.series(buildProject, gulp.parallel(startServer, watch));

export {
	devWatch as default,
	devWatch as dev,
	buildProject as build,
	startServer as serve,
	runTests as test,
};
