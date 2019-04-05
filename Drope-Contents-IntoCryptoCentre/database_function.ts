let AWS = require("aws-sdk");

//Configure AWS
AWS.config.update({
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

//Create new DocumentClient
let documentClient = new AWS.DynamoDB.DocumentClient();

//FUNCTION SAVES CRYPTO DATA TO DATABASE
/* Function returns a Promise that will save the crypto data with the specified id. */
export function saveCryptoData(timeStamp: number, high: number, low: number, close: number): Promise<string> {

    //Table name and data for table
    let params = {
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
    return new Promise<string> ((resolve, reject) =>{
        documentClient.put(params, (err, data) => {
            if (err) {
                reject("Unable to add item: " +  JSON.stringify(err));
            }
            else {
                resolve("Item added to table with id: " + timeStamp);
            }
        })
    });
}

//FUNCTION SAVES TWEETS TO DATABASE
/* Function returns a Promise that will save the text with the specified id. */
export function saveData(created_at: number, tweetId: number, tweetText: String, coin: String): Promise<string> {
    //Table name and data for table
    let params = {
        TableName: "TwitterData",
        Item: {
            UnixTimeStamp: created_at,
            TweetId: tweetId,
            TweetText: tweetText,
            Coin: "Ethereum"
        }
    };

    //Store data in DynamoDB and handle errors
    return new Promise<string> ((resolve, reject) =>{
        documentClient.put(params, (err, data) => {
            if (err) {
                reject("Unable to add item: " +  JSON.stringify(err));
            }
            else {
                resolve("Item added to table with id: " + tweetId);
            }
        })
    });
}

//FUNCTION SAVES CRYPTO DATA TO DATABASE
/* Function returns a Promise that will save the crypto data with the specified id. */
export function saveSyntheticData(data): Promise<string> {

    //Table name and data for table
    let params = {
        TableName: "SyntheticData",
        Item: {
            Start: "2019-04-06 08:00:00",
            Target: data
        }
    };

    //Store data in DynamoDB and handle errors
    return new Promise<string> ((resolve, reject) =>{
        documentClient.put(params, (err, data) => {
            if (err) {
                reject("Unable to add item: " +  JSON.stringify(err));
            }
            else {
                resolve("Item added to table");
            }
        })
    });
}