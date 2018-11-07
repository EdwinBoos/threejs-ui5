"use strict";

const gulp = require("gulp");
const babel = require("gulp-babel");
const prettier = require("gulp-prettier");
const uglify = require("gulp-uglify");
const xmlValidator = require("gulp-xml-validator");
const jshint = require("gulp-jshint");
const stylish = require("jshint-stylish");

/**
 *
 * @ author : Boos Edwin
 * By entering "gulp --tasks" you will see all predefined tasks:
 * With "gulp taskname" you can start a predefined task
 * ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 *   ||| transpile-uglify  - task that will transpile all es6 .js files and put them in the correct folder of the es5 project folder (minified)
 *   ||| transpile-clean   - task that will transpile all es6 .js files and put them in the correct folder of the es5 project folder (es5-clean)
 *   ||| sync              - task that copies all needed files from the es6 folder and put them into the es5 project folder
 *   ||| prettier          - task that uses prettier to prettify all .js files in your es6 folder
 *   ||| xmlLint           - task that checks all xml files defined in /view/ or /fragment/ folder for parsing errors. It also does give good detailed explanation about the error.
 *   ||| jsHint            - task that checks all of your es6 js files for code quality.
 *   ||| check             - task that does combine xmlLint and jsHint tasks
 *   ||| |  jsHint
 *   ||| |  xmlLint
 *   ||| default           - this task is a watcher task, it watches for changes in your es6 folder and does run the child tasks below
 *   ||| |   sync
 *   ||| |   transpile-clean
 *   ||| build             (use when building project for productive cases, because this build will minify size of your .js files)
 *   ||| |   sync
 *   ||| |   transpile-uglify
 *   ||| build-debug       (use when building locally, your code will be much more readable and better for debugging in the browser)
 *   ||| |   sync
 *   ||| |   transpile-clean
 * ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 *
 */
gulp.task("transpile-uglify", () => {
  gulp
    .src("./WebContent/util/**.js")
    .pipe(babel({ presets: ["es2015"] }))
    .pipe(uglify())
    .pipe(gulp.dest("../demo/WebContent/util"));
  gulp
    .src("./WebContent/control/**.js")
    .pipe(babel({ presets: ["es2015"] }))
    .pipe(uglify())
    .pipe(gulp.dest("../demo/WebContent/control"));
  gulp
    .src("./WebContent/Component.js")
    .pipe(babel({ presets: ["es2015"] }))
    .pipe(uglify())
    .pipe(gulp.dest("../demo/WebContent/"));
  gulp
    .src("./WebContent/controller/**.js")
    .pipe(babel({ presets: ["es2015"] }))
    .pipe(uglify())
    .pipe(gulp.dest("../demo/WebContent/controller"));
  gulp
    .src([
      "./WebContent/libraries/**.js",
      "!./WebContent/libraries/node_modules",
      "!./WebContent/libraries/RequireLibs.js"
    ])
    .pipe(babel({ presets: ["es2015"] }))
    .pipe(uglify())
    .pipe(gulp.dest("../demo/WebContent/libraries/"));
});

gulp.task("transpile-clean", () => {
  gulp
    .src("./WebContent/util/**.js")
    .pipe(babel({ presets: ["es2015"] }))
    .pipe(gulp.dest("../demo/WebContent/util"));
  gulp
    .src("./WebContent/control/**.js")
    .pipe(babel({ presets: ["es2015"] }))
    .pipe(gulp.dest("../demo/WebContent/control"));

  gulp
    .src("./WebContent/Component.js")
    .pipe(babel({ presets: ["es2015"] }))
    .pipe(gulp.dest("../demo/WebContent/"));
  gulp
    .src("./WebContent/controller/**.js")
    .pipe(babel({ presets: ["es2015"] }))
    .pipe(gulp.dest("../demo/WebContent/controller"));
  gulp
    .src([
      "./WebContent/libraries/**.js",
      "!./WebContent/libraries/node_modules",
      "!./WebContent/libraries/RequireLibs.js"
    ])
    .pipe(babel({ presets: ["es2015"] }))
    .pipe(gulp.dest("../demo/WebContent/libraries/"));
});

gulp.task("sync", () => {
  // Copying or mirroring files into new es5 project folder
  gulp.src([".project"]).pipe(gulp.dest("../demo"));
  gulp.src([".classpath"]).pipe(gulp.dest("../demo"));
  gulp.src([".settings/**"]).pipe(gulp.dest("../demo/.settings"));
  gulp
    .src(["WebContent/WEB-INF/web.xml"])
    .pipe(gulp.dest("../demo/WebContent/WEB-INF"));

  gulp
    .src(["WebContent/fragment/**.xml"])
    .pipe(gulp.dest("../demo/WebContent/fragment"));
  gulp
    .src(["WebContent/view/**.xml"])
    .pipe(gulp.dest("../demo/WebContent/view"));
  gulp.src(["WebContent/css/**.css"]).pipe(gulp.dest("../demo/WebContent/css"));
  gulp
    .src(["WebContent/i18n/**.properties"])
    .pipe(gulp.dest("../demo/WebContent/i18n"));
  gulp.src(["WebContent/manifest.json"]).pipe(gulp.dest("../demo/WebContent"));
  gulp.src(["WebContent/index.html"]).pipe(gulp.dest("../demo/WebContent"));
});

gulp.task("prettier", () => {
  gulp
    .src("**.js")
    .pipe(prettier({ singleQuote: false }))
    .pipe(gulp.dest("."));
  gulp
    .src("./WebContent/util/**.js")
    .pipe(prettier({ singleQuote: false }))
    .pipe(gulp.dest("WebContent/util"));
  gulp
    .src("./WebContent/Component.js")
    .pipe(prettier({ singleQuote: false }))
    .pipe(gulp.dest("WebContent/"));
  gulp
    .src("./WebContent/controller/**.js")
    .pipe(prettier({ singleQuote: false }))
    .pipe(gulp.dest("WebContent/controller"));
  gulp
    .src([
      "./WebContent/libraries/**.js",
      "!./WebContent/libraries/node_modules",
      "!./WebContent/libraries/RequireLibs.js"
    ])
    .pipe(prettier({ singleQuote: false }))
    .pipe(gulp.dest("WebContent/libraries/"));
});

gulp.task("xmlLint", () =>
  gulp
    .src(["WebContent/view/*.xml", "WebContent/fragment/*.xml"])
    .pipe(xmlValidator())
);

gulp.task("jsHint", () =>
  gulp
    .src([
      "*.js",
      "WebContent/*.js",
      "WebContent/controller/*.js",
      "WebContent/util/*.js"
    ])
    .pipe(jshint({ esnext: true }))
    .pipe(jshint.reporter(stylish))
);

gulp.task("check", ["jsHint", "xmlLint"]);

gulp.task("build", ["transpile-uglify", "sync"], done => done());

gulp.task("build-debug", ["transpile-clean", "sync"], done => done());

gulp.task("default", ["build-debug"], () => {
  gulp.watch(
    ["./**", "!./node_modules/**", ".!/WebContent/libraries/node_modules/**"],
    { interval: 500 },
    ["build-debug"]
  );
});
