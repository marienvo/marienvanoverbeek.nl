/**
 *
 *  Marien van Overbeek
 *
 */

"use strict";

/*
 * Settings
 * */
var AUTOPREFIXER_BROWSERS = [
  "ie >= 10",
  "ie_mob >= 10",
  "ff >= 30",
  "chrome >= 34",
  "safari >= 7",
  "opera >= 23",
  "ios >= 7",
  "android >= 4.4",
  "bb >= 10",
];

// Dependencies
var gulp = require("gulp");
var fs = require("fs");
var path = require("path");
var $ = require("gulp-load-plugins")();
var shell = require("gulp-shell");
var twig = require("gulp-twig");
var rename = require("gulp-rename");
var postcss = require("gulp-postcss");
var reporter = require("postcss-reporter");
var stylelint = require("stylelint");
var runSequence = require("run-sequence");
var bemLinter = require("postcss-bem-linter");
var browserSync = require("browser-sync");
var marked = require("marked");
var yaml = require("js-yaml");
var responsive = require("gulp-responsive");
var codacy = require("gulp-codacy");
var reload = browserSync.reload;
var POST_PROCESSORS = [
  bemLinter({
    preset: "bem",
    ignoreSelectors: [/\.no-.+/],
  }),
  stylelint({
    rules: {
      "declaration-no-important": true,
      "selector-no-id": true,
      "selector-no-vendor-prefix": true,
      "property-no-vendor-prefix": true,
      "color-no-invalid-hex": true,
      "color-named": "never",
      "function-url-quotes": "double",
      "string-quotes": "double",
      "value-no-vendor-prefix": true,
      "stylelint-disable-reason": "always-after",
      "declaration-colon-space-after": "always",
      "selector-class-pattern": [
        /^(?!js-).+/,
        {
          message: "Please do not use js- prefix for styling",
        },
      ],
      "max-nesting-depth": [
        2,
        {
          ignore: ["at-rules-without-declaration-blocks"],
        },
      ],
    },
    ignoreFiles: ["resources/styles/vendor/**/*"],
  }),
  reporter({
    noPlugin: true,
    clearMessages: true,
  }),
];

var sassLint = require("gulp-sass-lint");

gulp.task("sasslint", function () {
  gulp
    .src([
      "resources/styles/layout/**/*.s+(a|c)ss",
      "resources/styles/modules/**/*.s+(a|c)ss",
    ])
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

/*
 * Lint files
 * */

gulp.task("lint", function () {
  gulp
    .src(["./resources/scripts/main.js", "./resources/scripts/modules/**/*.js"])
    .pipe($.eslint())
    .pipe($.eslint.format());
});

/*
 * Compile assets
 * */

// Concatenate and minify JavaScript. Optionally transpiles ES2015 code to ES5.
gulp.task("scripts", function () {
  return fs.readFile(
    // Note: Since we are not using useref in the scripts build pipeline,
    //       you need to explicitly list your scripts in app/scripts/package.json
    //       in the right order to be correctly concatenated
    //       (order: vendor, main.js, modules)
    "resources/scripts/package.json",
    { encoding: "utf-8", flag: "rs" },
    function (e, data) {
      data = JSON.parse(data);
      var src = data.vendor.concat([data.main]).concat(data.modules);

      // noinspection JSUnresolvedFunction
      return gulp
        .src(src)
        .pipe($.sourcemaps.init())
        .pipe($.babel())
        .pipe($.sourcemaps.write())
        .pipe($.concat("main.min.js"))
        .pipe($.uglify({ preserveComments: "some" }))
        .pipe($.size({ title: "scripts" }))
        .pipe($.sourcemaps.write("."))
        .pipe(gulp.dest("build/assets/scripts"));
    },
  );
});

// Optimize images
gulp.task("images", function () {
  // Copy images
  gulp
    .src(["resources/images/**/*.{png,jpg}"])
    .pipe(gulp.dest("build/assets/images"));

  return fs.readFile(
    "resources/images/config.json",
    { encoding: "utf-8", flag: "rs" },
    function (e, data) {
      data = JSON.parse(data);

      return gulp
        .src("resources/images/**/*.{png,jpg}")
        .pipe(
          responsive(data, {
            // Global configuration for all images
            // The output quality for JPEG, WebP and TIFF output formats
            quality: 80,
            // Use progressive (interlace) scan for JPEG and PNG output
            progressive: true,
            // Strip all metadata
            withMetadata: false,
            // Do not emit the error when image is enlarged.
            errorOnEnlargement: false,
          }),
        )
        .pipe(gulp.dest("build/assets/images"));
    },
  );

  // TODO: Image resizing: cache? imagemin? size?:
  // gulp.src('resources/images/**/*')
  //     .pipe($.cache($.imagemin({
  //         progressive: true,
  //         interlaced: true
  //     })))
  //     .pipe(gulp.dest('build/images'))
  //     .pipe($.size({title: 'images'}));

  // TODO: auto sprite SVG?
  // TODO: auto sprite PNG icons to SASS?
});

// Copy all files at the root level (app)
gulp.task("copy", function () {
  gulp
    .src(
      [
        "!views/",
        "resources/*",
        "node_modules/apache-server-configs/build/.htaccess",
      ],
      {
        dot: true,
      },
    )
    .pipe($.flatten())
    .pipe(gulp.dest("build"))
    .pipe($.size({ title: "copy" }));

  // Copy files
  gulp.src(["resources/files/**/*"]).pipe(gulp.dest("build/assets/files"));
});

// Compile and automatically prefix stylesheets
gulp.task("styles", function () {
  var fileExt = "{sass,scss}";

  gulp
    .src(["resources/styles/**/*." + fileExt])
    .pipe(
      $.sass({
        precision: 10,
      }).on("error", $.sass.logError),
    )
    .pipe(postcss(POST_PROCESSORS))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe($.concat("main.css"))
    .pipe(gulp.dest("test/styles"));

  // For best performance, don't add Sass partials to `gulp.src`
  return gulp
    .src(["resources/styles/**/*." + fileExt])
    .pipe($.sourcemaps.init())
    .pipe(
      $.sass({
        precision: 10,
      }).on("error", $.sass.logError),
    )
    .pipe(postcss(POST_PROCESSORS))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe($.concat("main.min.css"))
    .pipe($.size({ title: "styles (sass)" }))
    .pipe($.sourcemaps.write("./"))
    .pipe(gulp.dest("build/assets/styles"));
});

/*
 * Render templates
 * */
gulp.task("twig", function () {
  var folders = getFolders("resources/data");

  /*
   * Some useful functions
   */
  function getFolders(dir) {
    return fs.readdirSync(dir).filter(function (file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
  }

  function getFiles(dir) {
    return fs.readdirSync(dir).filter(function (file) {
      return fs.statSync(path.join(dir, file)).isFile();
    });
  }

  function getPosition(str, m, i) {
    return str.split(m, i).join(m).length;
  }

  function mergeObjects(obj1, obj2) {
    var obj3 = {};
    var attrname;
    for (attrname in obj1) {
      obj3[attrname] = obj1[attrname];
    }
    for (attrname in obj2) {
      obj3[attrname] = obj2[attrname];
    }
    return obj3;
  }

  // Render Twig files with JSON data
  fs.readFile(
    "resources/data/client.json",
    { encoding: "utf-8", flag: "rs" },
    function (e, data) {
      data = JSON.parse(data);

      // Set server base href for deployment in sub folder
      data.server = {
        base: '<base href="/">',
      };

      gulp
        .src(["resources/views/**/*.twig", "!resources/views/**/_*.twig"])
        .pipe(
          twig({
            data: data,
          }),
        )
        .pipe(gulp.dest("build/"));
    },
  );

  // Render Markdown files with Twig
  folders.map(function (folder) {
    var files = getFiles("resources/data/" + folder);
    files.map(function (file) {
      var data = {
        meta: {},
        metaEnd: 0,
        raw: fs.readFileSync("resources/data/" + folder + "/" + file, "utf8"),
        body: "",
      };

      // Get some meta data ready for use in Twig
      if (data.raw.substring(0, 3) === "---") {
        data.metaEnd = getPosition(data.raw, "---", 2);
        data.meta = data.raw.substring(3, data.metaEnd);
        data.body = data.raw.substring(
          data.metaEnd + 3,
          data.raw.length + data.metaEnd,
        );
      }

      var context = mergeObjects(yaml.safeLoad(data.meta), {
        body: marked(data.body),
      });

      gulp
        .src(["resources/views/_" + folder + ".twig"])
        .pipe(
          twig({
            data: context,
          }),
        )
        .pipe(rename(file.replace(".md", "/index.html")))
        .pipe(gulp.dest("build/" + folder));
    });
  });
});

/*
 * Watch files for changes & reload
 * */
gulp.task("default", function () {
  var settingsServer = {
    baseDir: "build",
  };

  browserSync.init(
    {
      notify: false,
      logPrefix: "localhost:3030",
      scrollElementMapping: ["main", ".mdl-layout"],
      server: settingsServer,
      port: 3030,
    },
    function () {
      // var port = this.options.get('port')
      // gulp.src('').pipe(shell(['open http://localhost:' + port]))
    },
  );

  gulp.watch(["resources/views/email/**/*.mjml"], ["mjml", reload]);
  gulp.watch(
    ["resources/views/**/*.{twig,svg}", "resources/data/**/*.{json,md}"],
    ["twig", reload],
  );
  gulp.watch(
    ["resources/styles/**/*.{sass,scss,less,css,hbs}"],
    ["styles", "sasslint", reload],
  );
  gulp.watch(["resources/scripts/**/*.js"], ["lint", "scripts", reload]);
  gulp.watch(["resources/images/**/*"], reload);
});

// Build production files
gulp.task("bower", shell.task(["bower install && bower update"]));
gulp.task("update", function () {
  runSequence("bower", "build");
});
gulp.task("codacy", function codacyTask() {
  return gulp.src(["node_modules/.bin/codacy-coverage"], { read: false }).pipe(
    codacy({
      token: "CODACY_PROJECT_TOKEN",
    }),
  );
});
gulp.task("travis-ci", function () {
  runSequence("codacy", "build");
});
gulp.task("build", function () {
  runSequence("styles", ["lint", "twig", "scripts", "copy"]);
});
