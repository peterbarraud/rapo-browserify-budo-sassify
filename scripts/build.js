var fs = require('fs');

var buildJS = function(){
    console.log('Building index.js');
    var b = require('browserify')();
    b.add('src/js/main.js');
    b.transform('uglifyify', { global: true  })
    var indexjs = fs.createWriteStream('build/index.js');
    b.bundle().pipe(indexjs);
    console.log('Done: Building index.js');
};

var buildCSS = function(){
    console.log('Building index.css');
    var b = require('browserify')();
    b.add('index.js');
    b.transform(require('scssify'), {
        global: true,
        sendToCSSFile:true,
        onSendToCSSFile: function(data){
            fs.appendFileSync('build/index.css', data);
        },
    });
    b.bundle();
    console.log('Done: Building index.css');
}

var buildHTML = function(){
    fs.readFile('index.html', 'utf8', function(err, data){
        if (err) {
            return console.log(err);
          }
          var minify = require('html-minifier').minify;
          var result = minify(data, {
          removeAttributeQuotes: true
          });
        //   console.log(result);
          fs.writeFileSync('build/index.html', result);
      });
};

console.log("using rimraf just to first we clean out the entire build dir");
require('rimraf')('build', function(){
    console.log("re-make the build folder from scratch");
    require('mkdirp')('build', function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log("build the index.js");
            buildJS();
            console.log("build the index.css");            
            buildCSS();
            console.log('build the index.html');
            buildHTML();
        }
    });  
});