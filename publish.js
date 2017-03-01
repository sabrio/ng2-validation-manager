var fs = require('fs');

if (process.argv[2] == "public") {
  fs.createReadStream('package.json').pipe(fs.createWriteStream('packagedev.json')).on('close', function(){
    fs.createReadStream('packagepublish.json').pipe(fs.createWriteStream('package.json'));
  });
}


if (process.argv[2] == "dev"){
  fs.createReadStream('packagedev.json').pipe(fs.createWriteStream('package.json'));
}

