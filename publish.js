var fs = require('fs');

if (process.argv[2] == "pre") {
  fs.createReadStream('package.json').pipe(fs.createWriteStream('packagetmp.json')).on('close', function(){
    fs.createReadStream('packagepublish.json').pipe(fs.createWriteStream('package.json'));
  });

  console.log('pre-install');
}


if (process.argv[2] == "post"){
  fs.createReadStream('packagetmp.json').pipe(fs.createWriteStream('package.json')).on('close', function(){
    fs.unlink('packagetmp.json');
  });
}

