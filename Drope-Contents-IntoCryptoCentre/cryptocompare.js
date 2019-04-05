"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
//Time library that we will use to increment dates.
var moment = require('moment');
//Axios will handle HTTP requests to web service
var axios = require('axios');
//Reads keys from .env file
var dotenv = require('dotenv');
//Database module
var database_function_1 = require("./database_function");
//Copy variables in file into environment variables
dotenv.config();
//Class that wraps fixer.io web service
var Crypto = /** @class */ (function () {
    function Crypto() {
        //Base URL of fixer.io API
        //https://min-api.cryptocompare.com/data/histominute?fsym=BTC&tsym=GBP&limit=10
        this.baseURL = "https://min-api.cryptocompare.com/data/histominute";
    }
    //Returns a Promise that will get the exchange rates for the specified date
    Crypto.prototype.getCryptoRates = function () {
        //Build URL for API call
        var url = this.baseURL + "?";
        url += "fsym=BTC";
        url += "&tsym=GBP";
        url += "&limit=100";
        url += "&api_key=" + process.env.CRYPTO_API_KEY;
        //Output URL and return Promise
        console.log("Building crypto Promise with URL: " + url);
        return axios.get(url);
    };
    return Crypto;
}());
exports.Crypto = Crypto;
//Function downloads and outputs crypto data and then saves it to dynamoDB
function storeData() {
    return __awaiter(this, void 0, void 0, function () {
        var cryptoIo, result, resultArr, promiseArray_1, databaseResult, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cryptoIo = new Crypto();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, cryptoIo.getCryptoRates()];
                case 2:
                    result = _a.sent();
                    resultArr = result['data']['Data'];
                    promiseArray_1 = [];
                    resultArr.forEach(function (data) {
                        console.log("Time Stamp: " + data.time + " High(GBP): " + data.high + " Low(GBP): " + data.low + " Close(GBP): " + data.close);
                        //Store save data promise in array
                        promiseArray_1.push(database_function_1.saveCryptoData(data.time, data.high, data.low, data.close));
                    });
                    return [4 /*yield*/, Promise.all(promiseArray_1)];
                case 3:
                    databaseResult = _a.sent();
                    console.log("Database result: " + JSON.stringify(databaseResult));
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.log(JSON.stringify(error_1));
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
;
//Call function to search for tweets with specified subject
storeData();
//# sourceMappingURL=cryptocompare.js.map