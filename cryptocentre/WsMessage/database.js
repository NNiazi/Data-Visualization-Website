let AWS = require("aws-sdk");

//Create new DocumentClient
let documentClient = new AWS.DynamoDB.DocumentClient();

//Returns all of the connection IDs
module.exports.getConnectionIds = async () => {
    let params = {
        TableName: "WebSocketClients"
    };
    return documentClient.scan(params).promise();
};

//Deletes the specified connection ID
module.exports.deleteConnectionId = async (connectionId) => {
    console.log("Deleting connection Id: " + connectionId);

    let params = {
        TableName: "WebSocketClients",
        Key: {
            ConnectionId: connectionId
        }
    };
    return documentClient.delete(params).promise();
};

//Returns all of the connection IDs
module.exports.getCryptoData = async () => {
    let params = {
        TableName: "CryptoData"
    };
    return documentClient.scan(params).promise();
};

//Returns all of the connection IDs
module.exports.getSentimentData = async () => {
    let params = {
        TableName: "SentimentData"
    };
    return documentClient.scan(params).promise();
};

//Returns all of the connection IDs
module.exports.getTwitterData = async () => {
    let params = {
        TableName: "TwitterData"
    };
    return documentClient.scan(params).promise();
};

//Returns all of the connection IDs
module.exports.getSyntheticData = async () => {
    let params = {
        TableName: "SyntheticData"
    };
    return documentClient.scan(params).promise();
};