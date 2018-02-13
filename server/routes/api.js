var fs = require('fs');
var parse = require('csv-parse/lib/sync');
var path = require('path');
var interface = require('../modules/interface').interface;
var bodyParser = require('body-parser');
var AWS = require('aws-sdk');
var watchr = require('watchr');
var cognito = require('amazon-cognito-js');

const url = require('url');
const querystring = require('querystring');
// Interface = require('../modules/interfaceES6');
// var interface = new Interface();

const express = require('express');
const router = express.Router();

let processPath = process.cwd();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

// Create the IPost Interface :)
let IPost = interface.implements({Title: '', Body: '', UserId: '', Id: ''});
//
// Create the IElement Interface :)
let IElement = interface.implements({Position: '', Name: '', Weight: '', Symbol: ''});
//

// Create the INpsclient Interface :)
let INpsclient = interface.implements({name: '', department: '', schedule: '', relationshipManager: ''});
//

let posts = new Array(IPost);
let elements = new Array(IElement);
let npsclients = new Array(INpsclient);

// DATABASE SETUP
var mongoose   = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/presentation'); // connect to our database
// Handle the connection event
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));

// db.once('open', function() {
//   console.log("DB connection alive");
// });

// Post models lives here
var Post     = require('../../src/app/models/post');
// Element models lives here
var Element     = require('../../src/app/models/element');
// Npsclient models lives here
var Npsclient     = require('../../src/app/models/npsClient');
var dynamodb;

// END DATABASE SETUP

// S3 setup

// Set the region
AWS.config.update({region: 'us-west-2'});
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-west-2:76f4ffab-b530-408a-a31e-83c9041e675c',
});

function s3GetBuckets() {
  // Create S3 service object
  s3 = new AWS.S3({apiVersion: '2006-03-01'});

// Call S3 to list current buckets
  s3.listBuckets(function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Bucket List", data.Buckets);
    }
  });
}

//End S3 setup

// DynamoDB Setup

function setUpDynamoDB() {
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-west-2:76f4ffab-b530-408a-a31e-83c9041e675c",
    RoleArn: "arn:aws:iam::001178231653:role/Cognito_DynamoPoolUnauth"
  });
  AWS.config.update({
    region: "us-west-2"
  });
  dynamodb = new AWS.DynamoDB();
  // console.log("dynamaDB: " + dynamodb);
}

function deleteTable(inTable) {
  // Strip off the leading colon
  var theTable = inTable.substr(1);

  // End strip off the leading colon
  return new Promise(function (resolve, reject) {
    var dynamodb = new AWS.DynamoDB();
    var dynamoDBreturn = "what?";
    var params = {
      TableName: theTable
    };
    console.log("deleting " + params.TableName + ' of ' + inTable);
    dynamodb.deleteTable(params, function(err, data) {
      if (err) {
        // document.getElementById('textarea').innerHTML = "Unable to read item: " + "\n" + JSON.stringify(err, undefined, 2);
        dynamoDBreturn = JSON.stringify(err, undefined, 2);
        console.log("couldn't find table: " + JSON.stringify(err, undefined, 2));
        resolve(dynamoDBreturn);
      } else {
        // document.getElementById('textarea').innerHTML = "GetItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
        dynamoDBreturn = JSON.stringify(data, undefined, 2);
        console.log("deleted table: " + JSON.stringify(data, undefined, 2));
        resolve(dynamoDBreturn);
      }
    });
  });
}

function deleteOneQandA(inId, inCategory) {
  // Strip off the leading colon
  var theId = inId.substr(1);
  var theCategory = inCategory.substr(1);

  // End strip off the leading colon
  return new Promise(function (resolve, reject) {
    var docClient = new AWS.DynamoDB.DocumentClient();
    var dynamoDBreturn = "what?";
    var params = {
      TableName: "C2PQandA",
      Key: {
        "id": theId,
        "category": theCategory
      }
    };
    console.log("deleting " + params.Key.id + ' ' + params.Key.id + ' of ' + inId);
    docClient.delete(params, function(err, data) {
      if (err) {
        // document.getElementById('textarea').innerHTML = "Unable to read item: " + "\n" + JSON.stringify(err, undefined, 2);
        dynamoDBreturn = JSON.stringify(err, undefined, 2);
        console.log("couldn't find qanda: " + JSON.stringify(err, undefined, 2));
        resolve(dynamoDBreturn);
      } else {
        // document.getElementById('textarea').innerHTML = "GetItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
        dynamoDBreturn = JSON.stringify(data, undefined, 2);
        console.log("deleted qanda: " + JSON.stringify(data, undefined, 2));
        resolve(dynamoDBreturn);
      }
    });
  });
}

function updateOneQandA(inId, inCategory, inSubcategory, inType, inQuestion) {
  // Strip off the leading colon
  var theId = inId.substr(1);
  var theCategory = inCategory.substr(1);
  var theSubcategory = inSubcategory.substr(1);
  var theType = inType.substr(1);
  var theQuestion = inQuestion.substr(1);
  // console.log("updating item: " + theId + ' ' + theCategory + ' ' + theSubcategory + ' ' + theType + ' ' + theQuestion);
  // End strip off the leading colon
  return new Promise(function (resolve, reject) {
    var docClient = new AWS.DynamoDB.DocumentClient();
    var dynamoDBreturn = "what?";
    var params = {
      TableName: "C2PQandA",
      Key: {
        "id": theId,
        "category": theCategory
      },
      UpdateExpression: "set info.subcategory = :s, info.questionType = :t, info.question = :q",
      ExpressionAttributeValues:{
        ":s":theSubcategory,
        ":t":theType,
        ":q":theQuestion
      },
      ReturnValues:"UPDATED_NEW"
    };
    console.log("updating " + params.Key.id + ' ' + params.Key.id + ' of ' + inId);
    docClient.update(params, function(err, data) {
      if (err) {
        // document.getElementById('textarea').innerHTML = "Unable to read item: " + "\n" + JSON.stringify(err, undefined, 2);
        dynamoDBreturn = JSON.stringify(err, undefined, 2);
        console.log("couldn't find qanda: " + JSON.stringify(err, undefined, 2));
        resolve(dynamoDBreturn);
      } else {
        // document.getElementById('textarea').innerHTML = "GetItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
        dynamoDBreturn = JSON.stringify(data, undefined, 2);
        console.log("updated qanda: " + JSON.stringify(data, undefined, 2));
        resolve(dynamoDBreturn);
      }
    });
  });
}

function geS3BucketContents(inBucket) {
  // Strip off the leading colon
  var theBucket = inBucket.substr(1);
  console.log("bucket name: " + theBucket);
  // End strip off the leading colon
  // Set the region
  AWS.config.update({region: 'us-west-2'});
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-west-2:76f4ffab-b530-408a-a31e-83c9041e675c',
    RoleArn: "arn:aws:iam::001178231653:role/Cognito_DynamoPoolUnauth"
  });
  return new Promise(function (resolve, reject) {
    s3 = new AWS.S3({apiVersion: '2006-03-01'});
    var s3Bucketreturn = "what?";
    var bucketParams = {Bucket: theBucket}; // "awsc2ppracticevbloise3"
    var params = {
      Bucket: theBucket,
      Delimiter: '/'
    }
    // Call S3 to list current buckets
    s3.listObjects(params, function(err, data) {
    // s3.getBucketAcl(bucketParams, function(err, data) {
      if (err) {
        // document.getElementById('textarea').innerHTML = "Unable to read item: " + "\n" + JSON.stringify(err, undefined, 2);
        s3Bucketreturn = JSON.stringify(err, undefined, 2);
        console.log("couldn't find bucket contents: " + JSON.stringify(err, undefined, 2));
        resolve(s3Bucketreturn);
      } else {
        // document.getElementById('textarea').innerHTML = "GetItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
        s3Bucketreturn = JSON.stringify(data, undefined, 2);
        console.log("retrieved bucket contents: " + JSON.stringify(data, undefined, 2));
        resolve(s3Bucketreturn);
      }
    });
  });
}

function getOneQandA(inId, inCategory) {
  // Strip off the leading colon
  var theId = inId.substr(1);
  var theCategory = inCategory.substr(1);
  // End strip off the leading colon
  return new Promise(function (resolve, reject) {
    var docClient = new AWS.DynamoDB.DocumentClient();
    var dynamoDBreturn = "what?";
    var params = {
      TableName: "C2PQandA",
      Key: {
        "id": theId,
        "category": theCategory
      }
    };
    console.log("looking for " + params.Key.id + ' ' + params.Key.id + ' of ' + inId);
    docClient.get(params, function(err, data) {
      if (err) {
        // document.getElementById('textarea').innerHTML = "Unable to read item: " + "\n" + JSON.stringify(err, undefined, 2);
        dynamoDBreturn = JSON.stringify(err, undefined, 2);
        console.log("couldn't find qanda: " + JSON.stringify(err, undefined, 2));
        resolve(dynamoDBreturn);
      } else {
        // document.getElementById('textarea').innerHTML = "GetItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
        dynamoDBreturn = JSON.stringify(data, undefined, 2);
        console.log("retrieved qanda: " + JSON.stringify(data, undefined, 2));
        resolve(dynamoDBreturn);
      }
    });
  });
}

function getAllQandAs() {
  return new Promise(function (resolve, reject) {
    var docClient = new AWS.DynamoDB.DocumentClient();
    var dynamoDBreturn = "what?";
    var params = {
      TableName: "C2PQandA"
    };
    console.log("looking for all Q and As");
    docClient.scan(params, onScan);

    function onScan(err, data) {
      if (err) {
        dynamoDBreturn = JSON.stringify(err, undefined, 2);
        console.log("couldn't find qanda: " + JSON.stringify(err, undefined, 2));
        resolve(dynamoDBreturn);
      } else {
        // Get all the qandas
        dynamoDBreturn = JSON.stringify(data, undefined, 2);
        console.log("retrieved qandas: " + JSON.stringify(data, undefined, 2));
        data.Items.forEach(function(qanda) {
          // document.getElementById('textarea').innerHTML += movie.year + ": " + movie.title + " - rating: " + movie.info.rating + "\n";
          console.log('found a q and a: ' + JSON.stringify(qanda));
        });

        // Continue scanning if we have more qandas (per scan 1MB limitation)
        // document.getElementById('textarea').innerHTML += "Scanning for more..." + "\n";
        /*params.ExclusiveStartKey = data.LastEvaluatedKey;
        docClient.scan(params, onScan);*/
        resolve(dynamoDBreturn);
      }
    }
  });
}

function randomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

function insertNew(inQandA) {
  return new Promise(function (resolve, reject) {
    var docClient = new AWS.DynamoDB.DocumentClient();
    var dynamoDBreturn = "what?";
    // use this for every new qAndA created
    var rString = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    var params = {
      TableName: "C2PQandA",
      Item: {
        "id": rString, // inQandA.id,
        "category": inQandA.category,
        "info": {
          "subcategory": inQandA.subcategory,
          "questionType": inQandA.questionType,
          "question": inQandA.question
        }
      }
    };
    console.log("inQandA: " + inQandA.id);
    docClient.put(params, function (err, data) {
      if (err) {
        // document.getElementById('textarea').innerHTML = "Unable to add item: " + "\n" + JSON.stringify(err, undefined, 2);
        dynamoDBreturn = err;
        console.log("problem inserting qanda: " + params.Item.id + " " + err);
        resolve(dynamoDBreturn);
      } else {
        // document.getElementById('textarea').innerHTML = "PutItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
        dynamoDBreturn = "inserted qanda: " + params.Item.id;
        console.log("inserted qanda: " + params.Item.id);
        resolve(dynamoDBreturn);
      }
    });
  });
}

function createQandAs() {
  return new Promise(function(resolve, reject) {
    var dynamoDBreturn = "what?";
    var params = {
      TableName: "C2PQandA",
      KeySchema: [
        {AttributeName: "id", KeyType: "HASH"},
        {AttributeName: "category", KeyType: "RANGE"}
      ],
      AttributeDefinitions: [
        {AttributeName: "id", AttributeType: "S"},
        {AttributeName: "category", AttributeType: "S"}
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    };

    dynamodb.createTable(params, function (err, data) {
      console.log("in dynamoDB.createTable for " + params.TableName);
      if (err) {
        // document.getElementById('textarea').innerHTML = "Unable to create table: " + "\n" + JSON.stringify(err, undefined, 2);
        dynamoDBreturn = JSON.stringify(err, undefined, 2);
        // localdynamoDBreturn = err;
        console.log("dynamoDBreturn: " + dynamoDBreturn);
        resolve(dynamoDBreturn);
      } else {
        // document.getElementById('textarea').innerHTML = "Created table: " + "\n" + JSON.stringify(data, undefined, 2);
        dynamoDBreturn = JSON.stringify(data, undefined, 2);
        console.log("dynamoDBreturn: " + dynamoDBreturn);
        resolve(dynamoDBreturn);
      }
    });
  });
}

// functions needed for watchr
function listener (changeType, fullPath, currentStat, previousStat) {
  var returnStuff;
  var fileContents;
  switch ( changeType ) {
    case 'update':
      console.log('the file', fullPath, 'was updated', currentStat, previousStat);
      returnStuff = 'the file ' + fullPath + ' was updated ' + currentStat + ' ' + previousStat;
      break;
    case 'create':
      console.log('the file', fullPath, 'was created', currentStat);
      returnStuff = 'the file ' + fullPath + ' was created ' + currentStat;
      var docClient = new AWS.DynamoDB.DocumentClient();
      var file = fullPath;
      if (file) {
        try {
          var data = fs.readFileSync(file, 'utf8');
          console.log("file data: " + data);
          fileContents = data;
        } catch(e) {
          console.log("file data: " + data);
          console.log('Error:', e.stack);
        }
        var allQandAs = JSON.parse(fileContents);

        allQandAs.forEach(function (qanda) {
          // document.getElementById('textarea').innerHTML += "Processing: " + qanda.id + "\n";
          var params = {
            TableName: "C2PQandA",
            Item: {
              "id": qanda.id,
              "category": qanda.category,
              "subcategory": qanda.subcategory,
              "info": qanda.info
            }
          };
          docClient.put(params, function (err, data) {
            if (err) {
              // document.getElementById('textarea').innerHTML += "Unable to add qanda: " + count + qanda.id + "\n";
              console.log("Unable to add qanda: " + count + qanda.id);
              // document.getElementById('textarea').innerHTML += "Error JSON: " + JSON.stringify(err) + "\n";
              console.log("Error JSON: " + JSON.stringify(err));
              returnStuff = "Unable to add qanda: " + count + qanda.id + ". Error JSON: " + JSON.stringify(err)
            } else {
              // document.getElementById('textarea').innerHTML += "PutItem succeeded: " + qanda.id + "\n";
              console.log("PutItem succeeded for qanda: " + qanda.id);
              returnStuff = "PutItem succeeded for qanda: " + qanda.id;
              // textarea.scrollTop = textarea.scrollHeight;
            }
          });
        });
      }
      break;
    case 'delete':
      console.log('the file', fullPath, 'was deleted', previousStat);
      returnStuff = 'the file ' + fullPath + ' was deleted ' + previousStat;
      break
  }
  return returnStuff;
}
function next (err) {
  if ( err )  {
    console.log('watch failed on', processPath, 'with error', err);
    return 'watch failed on ' + processPath + 'with error ' +  err;
  }
  console.log('watch successful on', processPath);
  return 'watch successful on ' + processPath;
}

function runWatcher() {
  var stalker = watchr.open('public/json', listener, next);
  // console.log("stalker: " + JSON.stringify(stalker));
  return stalker;
}
// End functions needed for watchr

function initialLoadQandAs() {
  var returnStuff;
  var dynamoDBreturn = "what?";
  returnStuff = runWatcher();
  return returnStuff;
}

insertIt = new Promise(function(resolve, reject) {
  resolve('done');
});


function executeCreateDynamoDBTable() {
    var returnStuff;
    setUpDynamoDB();
    createQandAs().then(function(successStuff){
    // console.log("success stuff: " + successStuff);
    returnStuff = successStuff;
    return returnStuff;
  });
}

function addItem(inQandA) {
  var returnStuff;
  setUpDynamoDB();
  insertNew(inQandA).then(function(successStuff){
    // console.log("success stuff: " + successStuff);
    returnStuff = successStuff;
    return returnStuff;
  });
}

function getOne(inQandA) {
  var returnStuff;
  setUpDynamoDB();
  getOneQandA(inQandA).then(function(successStuff){
    console.log("success stuff: " + successStuff);
    returnStuff = successStuff;
    return returnStuff;
  });
}

// End DynamoDB Setup

// DynamoDB simple test

// Create table
router.get('/dynamoDBcreate', (req, res) => {
    var returnStuff;
    // console.log('in dynamoDBtest api route');
    setUpDynamoDB();
    createQandAs().then(function(successStuff){
      // console.log("success stuff: " + successStuff);
      returnStuff = successStuff;
        // console.log("result: " + returnStuff);
        res.status(200).send(returnStuff);
    });
});
// End create table

// Initial Data Load
router.get('/dynamoDBinitialDataLoad', (req, res) => {
  var returnStuff
  setUpDynamoDB();
  returnStuff = initialLoadQandAs();
  // console.log("result: " + JSON.stringify(returnStuff));
  res.status(200).send({message: "listening for *.json"});
  // res.status(200).send(returnStuff);
});
// End initial data load

// Add Item
router.route('/dynamoDBaddItem')
 .post(function(req, res) {
    var returnStuff
    setUpDynamoDB();
    returnStuff = addItem(req.body);
    //console.log("result: " + JSON.stringify(returnStuff));
    res.status(200).send({message: "Inserted qanda: ", qandaId: req.body.id});
    // res.status(200).send(JSON.stringify(returnStuff);
});
// End add item

// Deltet table
// delete a table
router.route('/deleteTable/:qanda_table')
  .delete(function(req, res) {
    var returnStuff
    setUpDynamoDB();
    deleteTable(req.params.qanda_table).then(function (successStuff) {
      /*if (err)
        res.send(err);
        res.json(npsclient);
      */
      returnStuff = successStuff;
      res.status(200).send(returnStuff);
    });
  });
// End delete one item

// Deltet one item
// delete the npsclients with that id
router.route('/deleteQandA/:qanda_id/:qanda_category')
  .delete(function(req, res) {
    var returnStuff
    setUpDynamoDB();
    deleteOneQandA(req.params.qanda_id, req.params.qanda_category).then(function (successStuff) {
      /*if (err)
        res.send(err);
        res.json(npsclient);
      */
      returnStuff = successStuff;
      res.status(200).send(returnStuff);
    });
  });
// End delete one item

// Update one item
// update the npsclients with that id
router.route('/updateQandA/:qanda_id/:qanda_category/:qanda_subcategory/:qanda_questionType/:qanda_question')
  .put(function(req, res) {
    var returnStuff
    // console.log("rout updating item: " + req.params.qanda_id + ' ' + req.params.qanda_category + ' ' + req.params.qanda_subcategory + ' ' + req.params.qanda_questionType + ' ' + req.params.qanda_question);
    setUpDynamoDB();
    updateOneQandA(req.params.qanda_id, req.params.qanda_category, req.params.qanda_subcategory, req.params.qanda_questionType, req.params.qanda_question).then(function (successStuff) {
      /*if (err)
        res.send(err);
        res.json(npsclient);
      */
      returnStuff = successStuff;
      res.status(200).send(returnStuff);
    });
  });
// End update one item

// Get one item
 // get the npsclients with that id
router.route('/c2pqanda/:qanda_id/:qanda_category')
  .get(function(req, res) {
    var returnStuff
    setUpDynamoDB();
    getOneQandA(req.params.qanda_id, req.params.qanda_category).then(function (successStuff) {
      /*if (err)
        res.send(err);
        res.json(npsclient);
      */
      returnStuff = successStuff;
      res.status(200).send(returnStuff);
    });
  });
// End get one item

// Get all items
router.route('/c2pqandas')
  .get(function(req, res) {
    var returnStuff
    setUpDynamoDB();
    getAllQandAs().then(function (successStuff) {
      /*if (err)
        res.send(err);
        res.json(npsclient);
      */
      returnStuff = successStuff;
      res.status(200).send(returnStuff);
    });
  });
// End get all items

// Get S3 Bucket list

router.route('/listBucketContents/:bucketName')
  .get(function(req, res) {
    var returnStuff;
    setUpDynamoDB();
    geS3BucketContents(req.params.bucketName).then(function (successStuff) {
      /*if (err)
        res.send(err);
        res.json(npsclient);
      */
      returnStuff = successStuff;
      // console.log("return stuff: " + returnStuff);
      res.status(200).send(returnStuff);
    });
  });

// End S3 get bucket list

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get all posts
router.get('/postsOLD', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  console.log('in routes api route');
  axios.get(`${API}/posts`)
    .then(posts => {
      res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
});

// Get simple test
router.get('/tester', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  let testPosts = new Array(Post);
  console.log('in tester api route');
  testPosts = getOnePost('./posts.csv');
  res.status(200).send(testPosts);
});

// Get html file for presentation slides
// add parameters to define which presentation directory and which slide with the directory
router.get('/getThePresentation', (req, res) => {
  // console.log('in get first presentation');
  // read the html file
  // will want to send in file name and directory within public as parameters eventually
  // var slideNumber = req.param('slide');
  let parsedUrl = url.parse(req.originalUrl);
  let parsedQs = querystring.parse(parsedUrl.query);
  // console.log('slide: ' + parsedQs.slide);
  // console.log('req.originalUrl: ' + req.originalUrl);
  fs.readFile('public/' + parsedQs.directory + '/' + parsedQs.directory + parsedQs.slide + '.html', 'utf8', function (err, data) {
    if (err) throw err;
    var resultArray = data;
    // console.log('returned html: ' + data);
    res.send(data);
  });
});
// end get html file for presentation slides

// Get simple test #2
router.get('/tester2', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  let testPosts = new Array(Post);
  console.log('in tester2 api route');
  testPosts = getOnePost('./otherData.csv');
  res.status(200).send(testPosts);
});

// Posts routes
router.route('/posts')
// create a post (accessed at POST http://localhost:8080/posts)
  .post(function(req, res) {

    var post = new Post();		// create a new instance of the Post model
    post.Title = req.body.title;  // set the posts title (comes from the request)
    post.Body = req.body.body;  // set the posts body (comes from the request)
    post.UserId = req.body.userId;  // set the posts userId (comes from the request)
    post.Id = req.body.id;  // set the posts id (comes from the request)

    post.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Post created!' });
    });


  })

  // get all the posts (accessed at GET http://localhost:8080/api/posts)
  .get(function(req, res) {
    console.log("in get all posts from database");
    Post.find(function(err, posts) {
      if (err)
        res.send(err);

      res.json(posts);
      console.log("found " + posts.length + " posts");
    });
  });

// on routes that end in /posts/:post_id
// ----------------------------------------------------
router.route('/posts/:post_id')

// get the post with that id
  .get(function(req, res) {
    Post.findById(req.params.post_id, function(err, post) {
      if (err)
        res.send(err);
      res.json(post);
    });
  })

  // update the post with this id
  .put(function(req, res) {
    Post.findById(req.params.post_id, function(err, post) {

      if (err)
        res.send(err);

      post.Title = req.body.title;
      post.Body = req.body.body;  // set the posts body (comes from the request)
      post.UserId = req.body.userId;  // set the posts userId (comes from the request)
      post.Id = req.body.id;

      post.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Post updated!' });
      });

    });
  })

  // delete the post with this id
  .delete(function(req, res) {
    Post.remove({
      _id: req.params.post_id
    }, function(err, post) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  });


function getOnePost(fileName) {
  let csv = fs.readFileSync(fileName, 'utf8');

  posts = parse(csv, {columns: true}).map(post => {
    return {
      title: post.Title,
      body: post.Body,
      userId: post.UserId,
      id: post.Id
    };
  });
  console.log(posts.length + ' posts loaded at ' + new Date());
  console.log('first post: ' + posts[0].title + ' ' + posts[0].body);
  console.log('JSON.stringified posts: ' + JSON.stringify(posts));

  return JSON.stringify(posts);
}

// Elements routes
router.route('/elements')
// create a elements (accessed at POST http://localhost:8080/elements)
  .post(function(req, res) {

    var element = new Element();		// create a new instance of the Element model
    element.Position = req.body.position;  // set the elements title (comes from the request)
    element.Name = req.body.name;  // set the elements body (comes from the request)
    element.Weight = req.body.weight;  // set the elements userId (comes from the request)
    element.Symbol = req.body.symbol;  // set the elements id (comes from the request)

    element.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Element created!' });
    });


  })

  // get all the elements (accessed at GET http://localhost:8080/api/elements)
  .get(function(req, res) {
    // console.log("in get all elements from database");
    Element.find(function(err, elements) {
      if (err)
        res.send(err);

      res.json(elements);
      // console.log("found " + elements.length + " elements");
    });
  });

// on routes that end in /elements/:element_id
// ----------------------------------------------------
router.route('/elements/:element_id')

// get the elements with that id
  .get(function(req, res) {
    Element.findById(req.params.element_id, function(err, element) {
      if (err)
        res.send(err);
      res.json(element);
    });
  })

  // update the elements with this id
  .put(function(req, res) {
    Element.findById(req.params.element_id, function(err, element) {

      if (err)
        res.send(err);

      element.Position = req.body.position;
      element.Name = req.body.name;  // set the elements body (comes from the request)
      element.Weight = req.body.weight;  // set the elements userId (comes from the request)
      element.Symbol = req.body.symbol;

      element.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Element updated!' });
      });

    });
  })

  // delete the elements with this id
  .delete(function(req, res) {
    Element.remove({
      _id: req.params.element_id
    }, function(err, element) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  });


function getOneElement(fileName) {
  let csv = fs.readFileSync(fileName, 'utf8');

  elements = parse(csv, {columns: true}).map(element => {
    return {
      position: element.Position,
      name: element.Name,
      weight: element.Weight,
      symbol: element.Symbol
    };
  });
  console.log(elements.length + ' elements loaded at ' + new Date());
  console.log('first elements: ' + elements[0].name + ' ' + elements[0].body);
  console.log('JSON.stringified elements: ' + JSON.stringify(elements));

  return JSON.stringify(elements);
}

/*----------------------------------------------------------------------------------*/
// Npsclient routes
router.route('/npsclients')
// create a npsclients (accessed at POST http://localhost:8080/npsclients)
  .post(function(req, res) {

    // console.log("creating an npsclient: " + req.body.relationshipManager);
    var npsclient = new Npsclient();		// create a new instance of the Element model
    npsclient.name = req.body.name;  // set the elements title (comes from the request)
    npsclient.department = req.body.department;  // set the elements body (comes from the request)
    npsclient.schedule = req.body.schedule;  // set the elements userId (comes from the request)
    npsclient.relationshipManager = req.body.relationshipManager;  // set the elements id (comes from the request)

    npsclient.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Npsclient added to the database!', data: npsclient});
    });


  })

  // get all the npsclinets (accessed at GET http://localhost:8080/api/npsclients)
  .get(function(req, res) {
    // console.log("in get all npsclients from database");
    Npsclient.find(function(err, npsclients) {
      if (err)
        res.send(err);

      res.header('Access-Control-Max-Age', 0);
      res.header('Cache-Control', 'max-age=0,no-cache,no-store,post-check=0,pre-check=0,must-revalidate');
      res.header('Expires', '-1');
      res.json(npsclients);
      // console.log("found " + npsclients.length + " npsclients");
    });
  });

// on routes that end in /npsclients/:npsclient_id
// ----------------------------------------------------
router.route('/npsclients/:npsclient_id')

// get the npsclients with that id
  .get(function(req, res) {
    Npsclient.findById(req.params.npsclient_id, function(err, npsclient) {
      // console.log("got client: " + npsclient._id);
      // console.log("got client schedule: " + npsclient._id);
      if (err)
        res.send(err);
      res.json(npsclient);
    });
  })

  // update the npsclients with this id
  .put(function(req, res) {
    // console.log('putting! ' + req.params.npsclient_id);
    Npsclient.findById(req.params.npsclient_id, function(err, npsclient) {

      if (err)
        res.send(err);

      npsclient.name = req.body.name;
      npsclient.department = req.body.department;  // set the elements body (comes from the request)
      npsclient.schedule = req.body.schedule;  // set the elements userId (comes from the request)
      npsclient.relationshipManager = req.body.relationshipManager;

      npsclient.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Npsclient updated!' + npsclient.name });
      });

    });
  })

  // delete the npsclients with this id
  .delete(function(req, res) {
    Npsclient.remove({
      _id: req.params.npsclient_id
    }, function(err, npsclient) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  });


function getOneNpsclient(fileName) {
  let csv = fs.readFileSync(fileName, 'utf8');

  npsclients = parse(csv, {columns: true}).map(npsclient => {
    return {
      name: npsclient.name,
      department: npsclient.department,
      weight: npsclient.schedule,
      symbol: npsclient.relationshipManager
    };
  });
  console.log(npsclients.length + ' npsclients loaded at ' + new Date());
  console.log('first npsclients: ' + npsclients[0].name + ' ' + npsclients[0].body);
  console.log('JSON.stringified npsclients: ' + JSON.stringify(npsclients));

  return JSON.stringify(npsclients);
}

module.exports = router;
