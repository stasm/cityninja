#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var rootdir = process.argv[2];
 
var files = {
  '../../../private/branding/android/res/drawable-ldpi/pushicon.png': 
    'platforms/android/res/drawable-ldpi/pushicon.png',
  '../../../private/branding/android/res/drawable-mdpi/pushicon.png': 
    'platforms/android/res/drawable-mdpi/pushicon.png',
  '../../../private/branding/android/res/drawable-hdpi/pushicon.png': 
    'platforms/android/res/drawable-hdpi/pushicon.png',
  '../../../private/branding/android/res/drawable-xhdpi/pushicon.png': 
    'platforms/android/res/drawable-xhdpi/pushicon.png',
};

Object.keys(files).forEach(function(key) {
  var srcfile = path.join(rootdir, key);
  var destfile = path.join(rootdir, files[key]);

  var destdir = path.dirname(destfile);
  if (fs.existsSync(srcfile) && fs.existsSync(destdir)) {
    // console.log('Cordova: Copying ' + srcfile + ' to ' + destfile);
    fs.createReadStream(srcfile).pipe(
      fs.createWriteStream(destfile)
    );
  }
});
