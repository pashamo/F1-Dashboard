const AWS = require('aws-sdk');
const configDDB = require('./config');

AWS.config.update({
  //accessKeyId: configDDB.accessKeyId,
  //secretAccessKey: configDDB.secretAccessKey,
  region: configDDB.region,
  endpoint: configDDB.endpoint_dev
});

//Load data to existing table
const dynamodb = new AWS.DynamoDB();

let params = [
  {
    TableName: "DEMO_F1Drivers"
  },
  {
    TableName: "DEMO_F1DriversStandings"
  }
]

console.log("Deleting Tables...");
params.map(param => {
  dynamodb.deleteTable(param, (err, data) => {
  if (err) {
    console.error("Unable to delete table", JSON.stringify(err,null,2));
  } else {
    console.log("DeleteTable succeeded:", data);
  }
})});