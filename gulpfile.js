const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const cache = require('gulp-cache');
const cssnano = require('gulp-cssnano');
const del = require('del');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const gutil = require('gulp-util');
const imagemin = require('gulp-imagemin');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const useref = require('gulp-useref');

const config = {
  sourcemaps: './maps',
  browserSync: {
    baseDir: ['./', 'dist']
  },
  assets: {
    src: 'src/assets/**/*',
    dest: 'dist/assets'
  },
  fonts: {
    src: 'src/fonts/**/*',
    dest: 'dist/fonts'
  },
  images: {
    src: 'src/img/**/*',
    dest: 'dist/img'
  },
  index: {
    src: 'src/index.html',
    dest: 'dist'
  },
  sass: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js'
  },
  views: {
    src: 'src/views/**/*.html',
    dest: 'dist/views'
  }
};

/**
 * Run BrowserSync
 */
gulp.task('browserSync', () =>
  browserSync.init({
    server: {
      baseDir: config.browserSync.baseDir
    }
  })
);

/**
 * Clean dist directory
 */
gulp.task('clean:dist', () => del.sync('dist'));

/**
 * Copy html files
 */
gulp.task('copy-html', () => {
  gulp.src(config.index.src).pipe(gulp.dest(config.index.dest));
});

/**
 * Copy assets
 */
gulp.task('copy-assets', () => {
  gulp.src(config.fonts.src).pipe(gulp.dest(config.fonts.dest));
  gulp.src(config.images.src).pipe(gulp.dest(config.images.dest));
  gulp.src(config.assets.src).pipe(gulp.dest(config.assets.dest));
});

/**
 * Transpile JavaScript files
 */
gulp.task('scripts', () =>
  gulp
    .src(config.scripts.src)
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(gulp.dest(config.scripts.dest))
);

/**
 * Compile SASS files
 */
gulp.task('sass', () =>
  gulp
    .src(config.sass.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write(config.sourcemaps))
    .pipe(gulp.dest(config.sass.dest))
    .pipe(
      browserSync.reload({
        stream: true
      })
    )
);

/**
 * Parse styles and scripts from index.html
 */
gulp.task('useref', () =>
  gulp
    .src('dist/index.html')
    .pipe(useref())
    .pipe(gulpif('*.css', autoprefixer()))
    .pipe(gulpif('*.css', cssnano()))

    .pipe(gulpif('*.js', uglify()))
    .on('error', gutil.log)
    .pipe(gulp.dest(config.index.dest))
);

/**
 * Minify images
 */
gulp.task('images', () =>
  gulp
    .src(config.images.src)
    .pipe(cache(imagemin()))
    .pipe(gulp.dest(config.images.dest))
);

/**
 * Watch for changes
 */
gulp.task('watch', ['browserSync'], () => {
  gulp.watch(config.index.src, ['copy-html']).on('change', browserSync.reload);
  gulp.watch(config.sass.src, ['sass']).on('change', browserSync.reload);
  gulp.watch(config.scripts.src, ['scripts']).on('change', browserSync.reload);

  gulp
    .watch([config.fonts.src, config.images.src, config.assets.src], ['copy-assets'])
    .on('change', browserSync.reload);
});

/**
 * Serve application
 */
gulp.task('default', cb => {
  runSequence('clean:dist', ['sass', 'scripts', 'copy-html', 'copy-assets'], 'watch', cb);
});

/**
 * Build application
 */
gulp.task('build', cb => {
  runSequence('clean:dist', ['sass', 'scripts', 'copy-html', 'copy-assets'], ['useref', 'images'], cb);
});
