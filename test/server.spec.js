'use strict';

var mongoose = require('mongoose');

let nock = require('nock');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let expect = chai.expect;

let Crypto = mongoose.model('Cryptos');

const testData = require('./crypto-test.json');

chai.use(chaiHttp);


describe('Crypto controller module', () => {
    
beforeEach((done) => {

    Crypto.remove({}, function() {
        Crypto.collection.insertMany(testData, function(err,crypto) {
            if (err) {
                console.log("ERREUR INSERTION ");
                console.log(err);
                done();
            } else {

                done();
            }
        });
    });
});

    
    

  describe('/GET cryptos', () => {
    it('it should GET all the cryptos', (done) => {
       var api = nock("https://min-api.cryptocompare.com")
                  .get("/data/pricemultifull?fsyms=BTC,LTC,&tsyms=USD")
                  .replyWithFile(200, 'test/cryptocompare-list-response.json', { 'Content-Type': 'application/json' });
        chai.request(server)
        .get('/cryptos')
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('array');
            expect(res.body.length).to.equal(2);
            expect(res.body[0].code).to.equal("BTC");
            expect(res.body[0].target).to.equal(300000);
            expect(res.body[0].quantity).to.equal(0.42);
            expect(res.body[0].price).to.equal(12345);
            expect(res.body[0].marketcap).to.equal(123456789);
            expect(res.body[1].code).to.equal("LTC");
            expect(res.body[1].target).to.equal(40000);
            expect(res.body[1].quantity).to.equal(1.48);
            expect(res.body[1].price).to.equal(123.45);
            expect(res.body[1].marketcap).to.equal(1234567.89);
            expect(res.headers['access-control-allow-origin']).to.equal('*');
            
          done();
          api.done();
        });
        
    });
    
    it('it should GET BTC information', (done) => {
        var api = nock("https://min-api.cryptocompare.com")
                  .get("/data/pricemultifull?fsyms=BTC,&tsyms=USD")
                  .replyWithFile(200, 'test/cryptocompare-list-response.json', { 'Content-Type': 'application/json' });
        
        chai.request(server)
        .get('/cryptos/BTC')
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body.code).to.equal('BTC');
            expect(res.body.target).to.equal(300000);
            expect(res.body.quantity).to.equal(0.42);
            expect(res.body.price).to.equal(12345);
            expect(res.body.marketcap).to.equal(123456789);
            expect(res.headers['access-control-allow-origin']).to.equal('*');
            done();
            api.done();
        });
    });
    it('it should GET LTC information', (done) => {
        var api = nock("https://min-api.cryptocompare.com")
                  .get("/data/pricemultifull?fsyms=LTC,&tsyms=USD")
                  .replyWithFile(200, 'test/cryptocompare-list-response.json', { 'Content-Type': 'application/json' });
        
        chai.request(server)
        .get('/cryptos/LTC')
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body.code).to.equal('LTC');
            expect(res.body.target).to.equal(40000);
            expect(res.body.quantity).to.equal(1.48);
            expect(res.body.price).to.equal(123.45);
            expect(res.body.marketcap).to.equal(1234567.89);
            expect(res.headers['access-control-allow-origin']).to.equal('*');
            done();
            api.done();
        });
        
    });
    
  });
})


