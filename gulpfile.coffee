gulp = require "gulp"
babel = require "gulp-babel"
concat = require "gulp-concat"
rename = require "gulp-rename"
plumber = require "gulp-plumber"
notify = require "gulp-notify"
wrapper = require "gulp-wrapper"
bs = require "browser-sync"

src =
  js: "src/js/" 

order = [
  "logger.es6.js"
].map (name) ->
  "#{src.js}#{name}"

outputfilename = "demoloader"

gulp.task "concat", ->
  gulp.src order
    .pipe concat "#{outputfilename}.es6.js"
    .pipe gulp.dest "src/js"

gulp.task "babel", ["concat"], ->
  gulp.src "src/js/#{outputfilename}.es6.js"
    .pipe plumber {errorHandler: notify.onError("<%= error.message %>") }
    .pipe do babel
    .pipe wrapper
      header: "(function()) {\n"
      footer: "\n})();"
    .pipe rename "#{outputfilename}.js"
    .pipe gulp.dest "dist/js"
  
gulp.task "default", ->
  bs.init
    server:
      baseDir: ["dist"]
      directory: false
    notify: false
    host: "localhost"
  gulp.watch ["src/js/**/*.es6.js"], ["babel", bs.reload]
