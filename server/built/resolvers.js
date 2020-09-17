"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const configDDB = require('./config');
configDDB();
// AWS.config.update({
//   accessKeyId: configDDB.accessKeyId,
//   secretAccessKey: configDDB.secretAccessKey,
//   region: configDDB.region,
//   endpoint: configDDB.endpoint_prod
// });
const docClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
module.exports = {
    Query: {
        //retreive all drivers
        f1drivers: () => __awaiter(void 0, void 0, void 0, function* () {
            let driversData = new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
                let params = {
                    TableName: "DEMO_F1DriversStandings",
                };
                yield docClient.scan(params, (err, data) => {
                    if (err) {
                        console.error("Unable to retreive Drivers:", JSON.stringify(data, null, 2));
                    }
                    else {
                        //console.log("Scan Succeeded:", JSON.stringify(data.Items,null,2));
                        resolve(data.Items);
                    }
                });
            }));
            return yield driversData;
        }),
        //retreive a single driver given driver name
        f1driver: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            let driverData = new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
                let params = {
                    TableName: "DEMO_F1DriversStandings",
                    Key: {
                        "driver": args.driver
                    }
                };
                yield docClient.get(params, (err, data) => {
                    if (err) {
                        console.error("Unable to retreive Driver:", JSON.stringify(err, null, 2));
                    }
                    else {
                        //console.log("GetItem succeeded:", JSON.stringify(data.Item,null,2));
                        resolve(data.Item);
                    }
                });
            }));
            return driverData;
        }),
        f1comments: () => __awaiter(void 0, void 0, void 0, function* () {
            let commentsData = new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
                let params = {
                    TableName: "DEMO_F1Comments"
                };
                yield docClient.scan(params, (err, data) => {
                    if (err) {
                        console.error("Unable to retreive Comments:", JSON.stringify(err, null, 2));
                    }
                    else {
                        //console.log("GetItem succeeded:", JSON.stringify(data.Item,null,2));
                        resolve(data.Items);
                    }
                });
            }));
            return commentsData;
        })
    },
    Mutation: {
        addf1comment: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            let newDate = new Date();
            console.log(newDate);
            let params = {
                TableName: "DEMO_F1Comments",
                Item: {
                    "comment": args.comment,
                    "id": newDate.toString()
                }
            };
            docClient.put(params, (err, data) => {
                if (err) {
                    console.error("Unable to add item", JSON.stringify(err, null, 2));
                }
                else {
                    console.log("PutItem succeeded:", JSON.stringify(data, null, 2));
                }
            });
        }),
        deletef1comment: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            let updateParams = {
                TableName: "DEMO_F1Comments",
                Key: {
                    "id": args.id
                }
            };
            docClient.delete(updateParams, (err, data) => {
                if (err) {
                    console.error("Unable to delete item", JSON.stringify(err, null, 2));
                }
                else {
                    console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
                }
            });
        })
    }
};
//# sourceMappingURL=resolvers.js.map