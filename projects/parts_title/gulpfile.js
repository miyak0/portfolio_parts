const gulp = require('gulp'); // Gulp読み込み
const sass = require('gulp-sass'); // Sassプラグイン読み込み
const postcss = require('gulp-postcss'); // PostCSSプラグイン読み込み
const autoprefixer = require('autoprefixer'); // ベンダープレフィックスプラグインの読み込み
const browser = require("browser-sync"); // ブラウザの自動リロード用プラグインの読み込み
var uglify = require('gulp-uglify'); //js圧縮
var cleanCSS = require('gulp-clean-css');// css圧縮
// Sassの書き出し
gulp.task('sass', function () {
    gulp.src('sass/**/*scss') //scssファイル取得
  //  （sassフォルダ内の全てのscssファイルが対象 ファイル指定したい場合は 'sass/style.scss' とか）
    .pipe(sass({
      outputStyle: 'expanded' // scss → cssのコンパイル（書き出し）方法
      })
      .on('error', sass.logError))//watch機能を止めずにエラー表示
      .pipe(postcss([
        autoprefixer()
      ])) 
      .pipe(gulp.dest('dist/css')); // cssファイル保存先
});
//JS圧縮
gulp.task('minify-js', function () {
  return gulp.src("js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
  //.pipe(gulp.dest('js')); 上書きする場合
});

//CSS圧縮
gulp.task('minify-css', function () {
  return gulp.src("dist/css/*.css")
    .pipe(cleanCSS())
    // .pipe(gulp.dest('dist/css/'));
  .pipe(gulp.dest('dist/css')); //上書きする場合
});
// ブラウザの自動リロード
gulp.task('server', function() {
  browser({
    server: {
    baseDir: "./"
    }
  });
});
gulp.task('reload', function () {
  browser.reload();
});
// watch機能
gulp.task('default', ['server'], function () {
    gulp.watch('sass/**/*.scss', ['sass']); // Sassの自動コンパイル
    gulp.watch('./**', ['reload']); // ブラウザの自動リロード
})