'use strict';

const https = require("https");


exports.complete = function(cryptos, callback) {
    var result = [];
    //console.log("crypto 1 : " + cryptos);
    var codes = "";
    cryptos.forEach(function(coin) {
        codes = codes + coin.code + ",";
    });
    //console.log(codes);
    var url = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms="+codes+"&tsyms=USD";
    //console.log(url);

    https.get(url, (response) => {
        
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });
      
       
        response.on('end', () => {
            //console.log("data : " + data);
            try {
                var jsonData = JSON.parse(data);
            } catch(e)
            {
                console.log(e);
            }
            //console.log(jsonData);
            
            cryptos.forEach(function(crypto) {
                var coin = {};
                coin.code = crypto.code;
                coin.quantity = crypto.quantity;
                coin.target = crypto.target; 
                coin.price = Number(jsonData.RAW[crypto.code].USD.PRICE);
                coin.marketcap = Number(jsonData.RAW[crypto.code].USD.MKTCAP);
                result.push(coin);
            });
            //console.log("result : " + result);
            callback(result);
        });
        response.on('error', (err) => {
            console.log("Error: " + err.message);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}
