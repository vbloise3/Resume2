var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('../Lambda json/additionalExamItems_arch.json')
  // input: require('fs').createReadStream('../Lambda json/testNulls.json')
});
var newLine;
var stringTest = 'My\u0000String\u0000\u0000\u0000';
lineReader.on('line', function (line) {
  // newLine = line.replace(/\0/g, '');
  // newLine = line.replace(/\u0000.*$/g,'');
  newLine = line.replace(/\0/g, '');
  nullsFound = line.length - newLine.length;
  console.log(newLine);
});
