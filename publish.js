var fs = require('fs');

if (process.argv[2] == "pre") {
  fs.createReadStream('package.json').pipe(fs.createWriteStream('packagedev.json')).on('close', function(){
    fs.createReadStream('packagepublish.json').pipe(fs.createWriteStream('package.json'));
  });

  console.log('pre-install');
}


if (process.argv[2] == "post"){
  fs.createReadStream('packagedev.json').pipe(fs.createWriteStream('package.json'));
}

