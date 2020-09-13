const AWS = require('aws-sdk');
const fs = require('fs');
const configDDB = require('./config');

AWS.config.update({
  accessKeyId: configDDB.accessKeyId,
  secretAccessKey: configDDB.secretAccessKey,
  region: configDDB.region,
  endpoint: configDDB.endpoint_prod
});

//Load data to existing table
const docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing drivers into DynamoDB. Please wait.");

let drivers = JSON.parse(fs.readFileSync('../data/DEMO_F1Drivers.json','utf-8'));

drivers.forEach(driver => {
  let params = {
    TableName: "DEMO_F1Drivers",
    Item: {
      "driver": driver.driver,
      "season": driver.season
    }
  };
  
  docClient.put(params, (err, data) => {
    if (err) {
      console.error("Unable to add Driver", driver.driver, ". Error JSON:", JSON.stringify(err,null,2));
    } else {
      console.log("PutItem succeeded:", driver.driver);
    }
  });
});


let standings = JSON.parse(fs.readFileSync('../data/DEMO_F1DriversStandings.json','utf-8'));
standings.map(standing => {
  let params = {
    TableName: "DEMO_F1DriversStandings",
    Item: {
      "driver": standing.driver,
      "f1constructor": standing.f1constructor,
      "position": standing.position,
      "points": standing.points,
      "pointsCumulative": standing.pointsCumulative
    }
  }

  docClient.put(params, (err, data) => {
    if (err) {
      console.error("Unable to add Driver", standing.driver, ". Error JSON:", JSON.stringify(err,null,2));
    } else {
      console.log("PutItem succeeded:", standing.driver);
    }
  });
});

let comments = JSON.parse(fs.readFileSync('../data/DEMO_F1Comments.json','utf-8'));
comments.map(comment => {
  let params = {
    TableName: "DEMO_F1Comments",
    Item: {
      "comment": comment.comment,
      "id": comment.id
    }
  }

  docClient.put(params, (err, data) => {
    if (err) {
      console.error("Unable to add Driver", comment.comment, ". Error JSON:", JSON.stringify(err,null,2));
    } else {
      console.log("PutItem succeeded:", comment.comment);
    }
  });
});