'use strict';
/*
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/cryptowatch'); 
var model = require
var controller = require('../controllers/cryptoController');
*/
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let expect = chai.expect;

chai.use(chaiHttp);

describe('Crypto controller module', () => {
    

    
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
                expect(res.body.length).to.equal(1);
                
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
                  done();
                });
          });
      
  });
})

