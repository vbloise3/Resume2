var AWS = require('aws-sdk');
var s3 = new AWS.S3();
// var cognito = require('amazon-cognito-js');

// Set the region
AWS.config.update({region: 'us-west-2'});
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-west-2:76f4ffab-b530-408a-a31e-83c9041e675c',
});

exports.handler = (event, context, callback) => {
  // get bucket and file info
  var returnStuff;
  var docClient = new AWS.DynamoDB.DocumentClient();
  var src_bkt = event.Records[0].s3.bucket.name;
  var src_key = event.Records[0].s3.object.key;
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
      console.log("Raw text:\n" + data.Body.toString('ascii'));
      var allMovies = JSON.parse(data.Body.toString('ascii'));

      allMovies.forEach(function (movie) {
        // document.getElementById('textarea').innerHTML += "Processing: " + movie.title + "\n";
        var params = {
          TableName: "Movies",
          Item: {
            "year": movie.year,
            "title": movie.title,
            "info": movie.info
          }
        };
        docClient.put(params, function (err, data) {
          if (err) {
            // document.getElementById('textarea').innerHTML += "Unable to add movie: " + count + movie.title + "\n";
            console.log("Unable to add movie: " +  movie.title);
            // document.getElementById('textarea').innerHTML += "Error JSON: " + JSON.stringify(err) + "\n";
            console.log("Error JSON: " + JSON.stringify(err));
            returnStuff = "Unable to add movie: "  + movie.title + ". Error JSON: " + JSON.stringify(err)
          } else {
            // document.getElementById('textarea').innerHTML += "PutItem succeeded: " + movie.title + "\n";
            console.log("PutItem succeeded for movie: " + movie.title);
            returnStuff = "PutItem succeeded for movie: " + movie.title;
            // textarea.scrollTop = textarea.scrollHeight;
          }
        });
      });
      callback(null, 'bucket: ' + src_bkt + ', ' + 'file: ' + src_key);
    }
  });
}
