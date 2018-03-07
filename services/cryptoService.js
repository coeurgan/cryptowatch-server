'use strict';

const https = require("https");

exports.complete = function(cryptos, callback) {
    var result = [];
    console.log("crypto 1 : " + cryptos);
    var codes = "";
    cryptos.forEach(function(coin) {
        codes = codes + coin.code + ",";
    });
    var url = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms="+codes+"&tsyms=USD";
    console.log(url);

    https.get(url, (response) => {
        let data = '';

        // A chunk of data has been recieved.
        response.on('data', (chunk) => {
            data += chunk;
        });
      
       
        // The whole response has been received. Print out the result.
        response.on('end', () => {
            var jsonData = JSON.parse(data);
            console.log(jsonData);
            console.log("cryptos 2 : " + cryptos);
            
            cryptos.forEach(function(crypto) {
                var coin = {};
                console.log("Price : " + Number(jsonData.RAW[crypto.code].USD.PRICE));
                coin.code = crypto.code;
                coin.quantity = crypto.quantity;
                coin.target = crypto.target; 
                coin.price = Number(jsonData.RAW[crypto.code].USD.PRICE);
                coin.marketcap = Number(jsonData.RAW[crypto.code].USD.MKTCAP);
                console.log("crypto.price : " + crypto.price);
                console.log("crypto : " + crypto);
                console.log("coin : " + coin);
                result.push(coin);
            });
            console.log("cryptos 2 : " + cryptos);
            console.log("result : " + result);
            callback(result);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}
