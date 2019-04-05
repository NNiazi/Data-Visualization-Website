//Time library that we will use to increment dates.
const moment = require('moment');

//Axios will handle HTTP requests to web service
const axios = require ('axios');

//Reads keys from .env file
const dotenv = require('dotenv');

//Database module
import { saveCryptoData } from "./database_function";

//Copy variables in file into environment variables
dotenv.config();

//Class that wraps fixer.io web service
export class Crypto {
    //Base URL of fixer.io API
    //https://min-api.cryptocompare.com/data/histominute?fsym=BTC&tsym=GBP&limit=10
    baseURL: string = "https://min-api.cryptocompare.com/data/histominute";

    //Returns a Promise that will get the exchange rates for the specified date
    getCryptoRates(): Promise<object> {
        //Build URL for API call
        let url:string = this.baseURL + "?";
        url += "fsym=BTC";
        url += "&tsym=GBP";
        url += "&limit=100";
        url += "&api_key=" + process.env.CRYPTO_API_KEY;

        //Output URL and return Promise
        console.log("Building crypto Promise with URL: " + url);
        return axios.get(url);
    }
}

//Function downloads and outputs crypto data and then saves it to dynamoDB
async function storeData(){

    let cryptoIo: Crypto = new Crypto();

    try{

        //Wait for search to execute asynchronously
        let result = await cryptoIo.getCryptoRates();

        //Output the result
        let resultArr: Array<CryptoRates> = result['data']['Data'];
        let promiseArray: Array< Promise<string> > = [];
        resultArr.forEach(function (data : CryptoRates){
            console.log("Time Stamp: " + data.time  + " High(GBP): " + data.high + " Low(GBP): " + data.low + " Close(GBP): " + data.close);

            //Store save data promise in array
            promiseArray.push(saveCryptoData(data.time, data.high, data.low, data.close));
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