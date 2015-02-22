gulp = require "gulp"
babel = require "gulp-babel"
concat = require "gulp-concat"
rename = require "gulp-rename"
plumber = require "gulp-plumber"
wrapper = require "gulp-wrapper"
notify = require "gulp-notify"
bs = require "browser-sync"

src =
  js: "./src/js/"

dist = "dist/js/"

name =
  es6: "demologger.es6.js"
  js: "demologger.js"
  
order = [
    "Elem"
  ].map (filename) ->
    "#{src.js}#{filename}.es6.js"

order.push "!#{src.js}#{name.es6}"

gulp.task "concat", ->
  gulp.src order
    .pipe plumber {errorHandler: notify.onError("<%= error.message %>") }
    .pipe concat "#{name.es6}"
    .pipe gulp.dest dist

gulp.task "babel", ["concat"], ->
  gulp.src "#{dist}#{name.es6}"
    .pipe plumber {errorHandler: notify.onError("<%= error.message %>") }
    .pipe do babel
    .pipe wrapper
      header: "(function()) {\n"
      footer: "\n})();"
    .pipe rename "#{name.js}"
    .pipe gulp.dest dist
  
gulp.task "default", ->
  bs.init
    server:
      baseDir: ["dist"]
      directory: false
    notify: false
    host: "localhost"
  
  gulp.watch ["src/js/**/*.es6.js", "!#{src.js}#{name.es6}"], ["babel", bs.reload]
