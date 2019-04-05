//Import external library with websocket functions
let ws = require('websocket');

let AWS = require("aws-sdk");

//Create new DocumentClient
let documentClient = new AWS.DynamoDB.DocumentClient();

//Import functions for database
let db = require('database');

//Hard coded domain name and stage - use when pushing messages from server to client
let domainName = "urad13t6ee.execute-api.us-east-1.amazonaws.com";
let stage = "dev";

exports.handler = async (event) => {
    try {

        //Get connection IDs of clients
        let cryptoArray = (await db.getCryptoData()).Items;
        console.log("\nClient IDs:\n" + JSON.stringify(cryptoArray));

        //Get connection IDs of clients
        let sentimentArray = (await db.getSentimentData()).Items;
        console.log("\nClient IDs:\n" + JSON.stringify(sentimentArray));

        //Get connection IDs of clients
        let syntheticArray = (await db.getSyntheticData()).Items;
        console.log("\nClient IDs:\n" + JSON.stringify(syntheticArray));

        let msg = {
            cryptoArray,
            syntheticArray,
            sentimentArray
        }

        //Get promises message to connected clients
        let sendMsgPromises = await ws.getSendMessagePromises(JSON.stringify(msg), domainName, stage);

        //Execute promises
        await Promise.all(sendMsgPromises);
    }
    catch(err){
        return { statusCode: 500, body: "Error: " + JSON.stringify(err) };
    }

    //Success
    return { statusCode: 200, body: "Data sent successfully." };
};


