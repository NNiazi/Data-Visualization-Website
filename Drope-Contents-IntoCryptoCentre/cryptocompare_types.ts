//The structure of a Rates object
interface FixerRates{
    USD: number,
    EUR: number,
    GBP: number
}


//The data structure returned in the message body by fixer.io
interface CryptoRates {
    time: number,
    high: number,
    low: number,
    close: number
}

//The data structure of a fixer.io error
interface FixerError{
    code: number,
    type: string,
    info: string,
}



