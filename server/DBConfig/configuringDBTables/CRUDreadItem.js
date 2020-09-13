const AWS = require('aws-sdk');
const configDDB = require('./config');

AWS.config.update({
  //accessKeyId: configDDB.accessKeyId,
  //secretAccessKey: configDDB.secretAccessKey,
  region: configDDB.region,
  endpoint: configDDB.endpoint_dev
});

//Read an Item on table
const docClient = new AWS.DynamoDB.DocumentClient();


let params = {
  TableName: "DEMO_F1DriversStandings",
  //Key: {"driver": "Pierre Gasly"}
};

console.log("Reading item");
docClient.scan(params, (err, data) => {
  if (err) {
    console.error("Unable to read item", JSON.stringify(err,null,2));
  } else {
    console.log("GetItem succeeded:", JSON.stringify(data.Items,null,2));
  }
});
