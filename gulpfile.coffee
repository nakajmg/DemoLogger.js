gulp = require "gulp"
babel = require "gulp-babel"
concat = require "gulp-concat"
rename = require "gulp-rename"
plumber = require "gulp-plumber"
wrapper = require "gulp-wrapper"
notify = require "gulp-notify"
uglify = require "gulp-uglify"
bs = require "browser-sync"

src =
  js: "./src/js/"

dist = "dist/js/"

name =
  es6: "demologger.es6.js"
  js: "demologger.js"
  min: "demologger.min.js"
  
order = [
    # "replacelog"
    "ConsoleToHtml"
    "Elem"
    "Frame"
    "Func"
    "Code"
    "Btn"
    "CodeBtn"
    "CodeCloseBtn"
    "Label"
    "FuncLabel"
    "Log"
    "Logger"
    "DemoLogger"
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
    .pipe babel({ blacklist: ["useStrict"] })
    .pipe rename "#{name.js}"
    .pipe gulp.dest dist

gulp.task "build", ["babel"], ->
  gulp.src "#{dist}#{name.js}"
    .pipe wrapper
      header: "(function() {\n"
      footer: "\n})();"
    .pipe do uglify
    .pipe rename name.min
    .pipe gulp.dest dist
  
gulp.task "default", ->
  bs.init
    server:
      baseDir: ["dist"]
      directory: false
    notify: false
    host: "localhost"
  
  gulp.watch ["src/js/**/*.es6.js", "!#{src.js}#{name.es6}"], ["babel", bs.reload]
  gulp.watch ["dist/index.html"], bs.reload

gulp.task "watch", ["default"]
