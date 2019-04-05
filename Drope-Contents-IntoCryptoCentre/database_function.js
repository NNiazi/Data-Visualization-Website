"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AWS = require("aws-sdk");
//Configure AWS
AWS.config.update({
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});
//Create new DocumentClient
var documentClient = new AWS.DynamoDB.DocumentClient();
//FUNCTION SAVES CRYPTO DATA TO DATABASE
/* Function returns a Promise that will save the crypto data with the specified id. */
function saveCryptoData(timeStamp, high, low, close) {
    //Table name and data for table
    var params = {
        TableName: "CryptoData",
        Item: {
            TimeStamp: timeStamp,
            Coin: "Bitcoin",
            High: high,
            Low: low,
            Close: close
        }
    };
    //Store data in DynamoDB and handle errors
    return new Promise(function (resolve, reject) {
        documentClient.put(params, function (err, data) {
            if (err) {
                reject("Unable to add item: " + JSON.stringify(err));
            }
            else {
                resolve("Item added to table with id: " + timeStamp);
            }
        });
    });
}
exports.saveCryptoData = saveCryptoData;
//FUNCTION SAVES TWEETS TO DATABASE
/* Function returns a Promise that will save the text with the specified id. */
function saveData(created_at, tweetId, tweetText, coin) {
    //Table name and data for table
    var params = {
        TableName: "TwitterData",
        Item: {
            UnixTimeStamp: created_at,
            TweetId: tweetId,
            TweetText: tweetText,
            Coin: "Ethereum"
        }
    };
    //Store data in DynamoDB and handle errors
    return new Promise(function (resolve, reject) {
        documentClient.put(params, function (err, data) {
            if (err) {
                reject("Unable to add item: " + JSON.stringify(err));
            }
            else {
                resolve("Item added to table with id: " + tweetId);
            }
        });
    });
}
exports.saveData = saveData;
//FUNCTION SAVES CRYPTO DATA TO DATABASE
/* Function returns a Promise that will save the crypto data with the specified id. */
function saveSyntheticData(data) {
    //Table name and data for table
    var params = {
        TableName: "SyntheticData",
        Item: {
            Start: "2019-04-06 08:00:00",
            Target: data
        }
    };
    //Store data in DynamoDB and handle errors
    return new Promise(function (resolve, reject) {
        documentClient.put(params, function (err, data) {
            if (err) {
                reject("Unable to add item: " + JSON.stringify(err));
            }
            else {
                resolve("Item added to table");
            }
        });
    });
}
exports.saveSyntheticData = saveSyntheticData;
//# sourceMappingURL=database_function.js.map