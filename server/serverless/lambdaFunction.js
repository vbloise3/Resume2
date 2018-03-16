var AWS = require('aws-sdk');
var s3 = new AWS.S3();
// var cognito = require('amazon-cognito-js');

// Set the region
AWS.config.update({region: 'us-west-2'});
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-west-2:76f4ffab-b530-408a-a31e-83c9041e675c',
});

function randomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

exports.handler = (event, context, callback) => {
  // get bucket and file info
  var returnStuff;
  var tableName;
  var docClient = new AWS.DynamoDB.DocumentClient();
  var src_bkt = event.Records[0].s3.bucket.name;
  var src_key = event.Records[0].s3.object.key;
  // use this for every new qAndA created
  var rString = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
  console.log('bucket: ' + src_bkt + ', ' + 'file: ' + src_key);
  // Retrieve the object
  s3.getObject({
    Bucket: src_bkt,
    Key: src_key
  }, function(err, data) {
    if (err) {
      console.log(err, err.stack);
      callback(err);
    } else {
      // console.log("Raw text:\n" + data.Body.toString('ascii'));
      var allQandAs = JSON.parse(data.Body.toString('ascii'));
      if ( src_key.indexOf("arch") === -1 ) {
        tableName = "C2PQandA";
      } else {
        tableName = "CA2QandA";
      }

      allQandAs.forEach(function (qanda) {
        // document.getElementById('textarea').innerHTML += "Processing: " + qanda.id + "\n";
        rString = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        var params = {
          TableName: tableName,
          Item: {
            "id": rString, // qanda.id,
            "category": qanda.category,
            "info": qanda.info
          }
        };
        console.log("puting to " + params.TableName + " item " + params.Item.id + " with question type " + params.Item.info.questionType);
        docClient.put(params, function (err, data) {
          if (err) {
            // document.getElementById('textarea').innerHTML += "Unable to add movie: " + count + movie.title + "\n";
            console.log("Unable to add qanda: " +  qanda.id);
            // document.getElementById('textarea').innerHTML += "Error JSON: " + JSON.stringify(err) + "\n";
            console.log("Error JSON: " + JSON.stringify(err));
            returnStuff = "Unable to add qanda: "  + qanda.id + ". Error JSON: " + JSON.stringify(err)
          } else {
            // document.getElementById('textarea').innerHTML += "PutItem succeeded: " + qanda.id + "\n";
            console.log("PutItem succeeded for qanda: " + qanda.id);
            returnStuff = "PutItem succeeded for qanda: " + qanda.category;
            // textarea.scrollTop = textarea.scrollHeight;
          }
        });
      });
      callback(null, 'bucket: ' + src_bkt + ', ' + 'file: ' + src_key);
    }
  });
}
