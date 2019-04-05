//Time library that we will use to increment dates.
const moment = require('moment');

//Axios will handle HTTP requests to web service
const axios = require ('axios');

//Reads keys from .env file
const dotenv = require('dotenv');

//Database module
import { saveSyntheticData } from "./database_function";

var fs = require('file-system');

//Copy variables in file into environment variables
dotenv.config();

//Class that wraps fixer.io web service
export class SyntheticData {
    //Base URL of fixer.io API
    //https://min-api.cryptocompare.com/data/histominute?fsym=BTC&tsym=GBP&limit=10
    baseURL: string = "https://m3ijbzm7a4.execute-api.us-east-1.amazonaws.com/dev/";

    //Returns a Promise that will get the exchange rates for the specified date
    getSyntheticRates(): Promise<object> {
        //Build URL for API call
        let url:string = this.baseURL + process.env.STUDENT_ID;

        //Output URL and return Promise
        console.log("Building crypto Promise with URL: " + url);
        return axios.get(url);
    }
}

//Function downloads and outputs crypto data and then saves it to dynamoDB
async function storeData(){

    let syntheticIo: SyntheticData = new SyntheticData();

    try{

        //Wait for search to execute asynchronously
        let result = await syntheticIo.getSyntheticRates();

        //Output the result
        let resultArr: Array<SyntheticRates> = result['data']['target'];
        let trimSynthetic = resultArr.splice(0, 100);
        let trimSyntheticTrain = resultArr.splice(100, 500);

        fs.writeFile('synthetic_2_data.json', trimSynthetic, function (err) {});
        fs.writeFile('synthetic_train_data.json', trimSyntheticTrain, function (err) {});

        let promiseArray: Array< Promise<string> > = [];
        trimSynthetic.forEach(function (data : SyntheticRates){
            //console.log("2019-04-06 08:00:00" + " Target: " + data);

            //Store save data promise in array
            //promiseArray.push(saveSyntheticData(data));
        });

        //Execute all of the save data promises
        let databaseResult: Array<string> = await Promise.all(promiseArray);
        console.log("Database result: " + JSON.stringify(databaseResult));
    }
    catch(error){
        console.log(JSON.stringify(error));
    }
};

//Call function to search for tweets with specified subject
storeData();