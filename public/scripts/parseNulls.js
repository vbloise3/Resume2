var fs = require("fs");
var text = fs.readFileSync('public/Lambda json/test_arch.json', "utf-8");
var textByLine = text;
/*var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('public/Lambda json/testExamples1_arch.json')
  // input: require('fs').createReadStream('../Lambda json/testNulls.json')
});*/
var newLine = " ";
var nullsFound = 0;
var concatenatedJSON = "";
var allQandAs = "";
var stringTest = 'My\u0000String\u0000\u0000\u0000';
/*lineReader.on('line', function (line) {
  // newLine = line.replace(/\0/g, '');
  // newLine = line.replace(/\u0000.*$/g,'');
  newLine = line.replace(/\0/g, '');
  // nullsFound = newLine + newLine.length;
  console.log(newLine);
  concatenatedJSON += newLine;
});*/


// console.log(text);
allQandAs = JSON.parse(text.toString('ascii'));
console.log(allQandAs);
