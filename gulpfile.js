const gulp = require("gulp");
const sass = require("gulp-sass");
const minifyCSS = require("gulp-csso");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const minifyjs = require("gulp-js-minify");
const sassGlob = require("gulp-sass-glob");
const gutil = require("gulp-util");
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");

// Static Server + watching scss/html files
gulp.task("serve", ["sass"], function() {
  browserSync.init({
    server: "./src"
  });
  gulp.watch("src/assets/scss/**/*.scss", ["sass"]);
  gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task("sass", function() {
  return gulp
    .src("src/assets/scss/style.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(
      plumber({
        errorHandler: function(err) {
          notify.onError({
            title: "Gulp error in " + err.plugin,
            message: err.toString()
          })(err);

          // play a sound once
          gutil.beep();
        }
      })
    )
    .pipe(sass())
    .pipe(gulp.dest("src/assets/css"))
    .pipe(browserSync.stream());
});

gulp.task("js", function() {
  return gulp
    .src("src/assets/js/script.js")
    .pipe(concat("script.min.js"))
    .pipe(minifyjs())
    .pipe(gulp.dest("src/assets/js"));
});

gulp.task("default", ["serve", "js"]);
