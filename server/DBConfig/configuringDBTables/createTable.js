const AWS = require('aws-sdk');
const configDDB = require('./config');

AWS.config.update({
  accessKeyId: configDDB.accessKeyId,
  secretAccessKey: configDDB.secretAccessKey,
  region: configDDB.region,
  endpoint: configDDB.endpoint_prod
});

//Create a table
const dynamodb = new AWS.DynamoDB();
const createF1Drivers = {
  TableName: "DEMO_F1Drivers",
  KeySchema: [
    {
      AttributeName: "driver", 
      KeyType: "HASH"
    }
  ],
  AttributeDefinitions: [
    {
      AttributeName: "driver",
      AttributeType: "S"
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
}

const createF1DriversStandings = {
  TableName: "DEMO_F1DriversStandings",
  KeySchema: [
    {
      AttributeName: "driver", 
      KeyType: "HASH"
    }
  ],
  AttributeDefinitions: [
    {
      AttributeName: "driver",
      AttributeType: "S"
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
}

const createF1Comments = {
  TableName: "DEMO_F1Comments",
  KeySchema: [
    {
      AttributeName: "id", 
      KeyType: "HASH"
    }
  ],
  AttributeDefinitions: [
    {
      AttributeName: "id",
      AttributeType: "S"
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
}

dynamodb.createTable(createF1Drivers, (err, data) => {
  if(err) {
    console.error("Unable to create table, Error JSON:", JSON.stringify(err,null,2));
  } else {
    console.log("Created table. Table description JSON:", JSON.stringify(data,null,2));
  }
});
dynamodb.createTable(createF1DriversStandings, (err, data) => {
  if(err) {
    console.error("Unable to create table, Error JSON:", JSON.stringify(err,null,2));
  } else {
    console.log("Created table. Table description JSON:", JSON.stringify(data,null,2));
  }
});
dynamodb.createTable(createF1Comments, (err, data) => {
  if(err) {
    console.error("Unable to create table, Error JSON:", JSON.stringify(err,null,2));
  } else {
    console.log("Created table. Table description JSON:", JSON.stringify(data,null,2));
  }
});