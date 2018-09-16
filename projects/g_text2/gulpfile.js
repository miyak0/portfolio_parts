const gulp = require('gulp'); // Gulp読み込み
const sass = require('gulp-sass'); // Sassプラグイン読み込み
const postcss = require('gulp-postcss'); // PostCSSプラグイン読み込み
const autoprefixer = require('autoprefixer'); // ベンダープレフィックスプラグインの読み込み
const browser = require("browser-sync"); // ブラウザの自動リロード用プラグインの読み込み

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
      .pipe(gulp.dest('css')); // cssファイル保存先
});
// watch機能
gulp.task('default', function () {
    gulp.watch('sass/**/*.scss', ['sass']); // Sassの自動コンパイル
    gulp.watch('./**', ['reload']); // ブラウザの自動リロード
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