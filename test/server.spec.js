'use strict';

var mongoose = require('mongoose');


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

afterEach(function() {

});
    
    
 /*
  * Test the /GET route
  */
  describe('/GET cryptos', () => {
    it('it should GET all the cryptos', (done) => {
        chai.request(server)
        .get('/cryptos')
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('array');
            expect(res.body.length).to.equal(2);
            
          done();
        });
    });
      
    it('it should GET BTC information', (done) => {
        chai.request(server)
        .get('/cryptos/BTC')
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body.code).to.equal('BTC');
            expect(res.body.target).to.equal(300000);
            expect(res.body.quantity).to.equal(0.42);
          done();
        });
    });
    it('it should GET LTC information', (done) => {
        chai.request(server)
        .get('/cryptos/LTC')
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body.code).to.equal('LTC');
            expect(res.body.target).to.equal(40000);
            expect(res.body.quantity).to.equal(1.48);
          done();
        });
    });
      
  });
})

