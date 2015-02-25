gulp       = require "gulp"
babel      = require "gulp-babel"
concat     = require "gulp-concat"
rename     = require "gulp-rename"
plumber    = require "gulp-plumber"
notify     = require "gulp-notify"
uglify     = require "gulp-uglify"
babelify   = require "babelify"
browserify = require "browserify"
source     = require "vinyl-source-stream"
buffer     = require "vinyl-buffer"
bs         = require "browser-sync"

src = "./src/js/DemoLogger.es6.js"

dist = "./dist/js/"

name =
  js: "demologger.js"
  min: "demologger.min.js"

gulp.task "build", ["babelify"] ->
  gulp.src "#{dist}#{name.js}"
    .pipe source name.js
    .pipe do buffer
    .pipe do uglify
    .pipe rename name.min
    .pipe gulp.dest dist
  
gulp.task "babelify", ->
  browserify
    debug: true
    extensions: [".es6.js"]
    standalone: "DemoLogger"
  .transform babelify.configure blacklist:["userStrict"]
  .require src, entry: true
  .bundle()
  .on "error", (err) ->
    console.log "Error: #{err.message}"
    @emit "end"
  .pipe gulp.dest dist
    
gulp.task "default", ->
  bs.init
    server:
      baseDir: ["dist"]
      directory: false
    notify: false
    host: "localhost"
  
  gulp.watch ["src/js/**/*.es6.js"], ["babelify", bs.reload]
  gulp.watch ["dist/index.html"], bs.reload

gulp.task "watch", ["default"]
