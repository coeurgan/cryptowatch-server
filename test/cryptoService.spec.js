var nock = require("nock");
var https = require("https");

let chai = require('chai');
let expect = chai.expect;
let service = require('../services/cryptoService');

describe("cryptoService", function() {
    
    it("test nock interceptor", function () {
        var api = nock("https://min-api.cryptocompare.com/")
                  .get("/")
                  .reply(200, "Hello World");

        https.get("https://min-api.cryptocompare.com/", function(resp) {
            var str = "";
            resp.on("data", function(data) { str += data; });
            resp.on("end", function() {
                //console.log("Got Result: ", str);
                expect(str).to.equal("Hello World");
                api.done();
            });
            resp.on("error", function() {
                console.error(e);
                expect.fail();  
            });
        });
    });
    
    it("really uses nock interceptor", function () {
       var api = nock("https://min-api.cryptocompare.com")
                  .get("/data/pricemultifull?fsyms=BTC,LTC,&tsyms=USD")
                  .replyWithFile(200, 'test/cryptocompare-list-response.json', { 'Content-Type': 'application/json' });
        service.complete([{'code' : 'BTC'},{'code':'LTC'}], function(completedCryptos) {
            api.done();
        });
    });
});